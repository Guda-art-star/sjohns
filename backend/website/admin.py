from django.contrib import admin
from django.utils.html import format_html
from django.contrib import messages
from .models import HeroSlide, KeyPillar, Announcement, SchoolEvent, AdmissionApplication, AlumniRegistry, FAQItem, StaffMember

# 1. Customizing Django Admin Site Titles to reflect St. John's College Mpigi branding
admin.site.site_header = "St. John's College Mpigi - Administration Control Center"
admin.site.site_title = "SJC Admin Portal"
admin.site.index_title = "Welcome to the SJC Website Management & Admissions Control Center"


@admin.register(HeroSlide)
class HeroSlideAdmin(admin.ModelAdmin):
    list_display = ('image_thumbnail', 'title', 'subtitle', 'order', 'is_active', 'created_at')
    list_editable = ('order', 'is_active')
    list_filter = ('is_active', 'created_at')
    search_fields = ('title', 'subtitle')
    readonly_fields = ('created_at', 'image_preview')
    fieldsets = (
        ('Banner Title & Captions', {
            'fields': ('title', 'subtitle'),
            'description': 'Configure text elements that slide on top of the background graphic.'
        }),
        ('Visual Content & Banner Image', {
            'fields': ('image', 'image_preview'),
        }),
        ('Controls & Sequencing', {
            'fields': ('order', 'is_active', 'created_at'),
        }),
    )

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height: 250px; border-radius: 12px; border: 1px solid #ccc;" />', obj.image.url)
        return "No image uploaded yet"
    image_preview.short_description = "Active Banner Image Preview"

    def image_thumbnail(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height: 44px; border-radius: 6px; object-fit: cover; width: 60px;" />', obj.image.url)
        return "No Image"
    image_thumbnail.short_description = "Preview"


@admin.register(KeyPillar)
class KeyPillarAdmin(admin.ModelAdmin):
    list_display = ('title', 'icon_name', 'bg_color', 'order')
    list_editable = ('order', 'bg_color')
    search_fields = ('title', 'description')
    fieldsets = (
        ('Core Details', {
            'fields': ('title', 'description'),
        }),
        ('Aesthetics & Vector Design', {
            'fields': ('icon_name', 'bg_color', 'order'),
            'description': 'Customize the rendering look and Lucide SVG icons of this pillar.'
        }),
    )


@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ('cover_thumbnail', 'title', 'category', 'date', 'is_active', 'created_at')
    list_editable = ('category', 'is_active')
    list_filter = ('category', 'is_active', 'date')
    search_fields = ('title', 'excerpt', 'content')
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('created_at',)
    
    actions = ['make_active', 'make_inactive']

    fieldsets = (
        ('Announcement Identity', {
            'fields': ('title', 'slug', 'category', 'date'),
        }),
        ('Detailed Content', {
            'fields': ('excerpt', 'content'),
            'description': 'The excerpt is the short description. The content stores full circular details.'
        }),
        ('Media Attachments', {
            'fields': ('image',),
        }),
        ('Status', {
            'fields': ('is_active', 'created_at'),
        }),
    )

    def cover_thumbnail(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height: 40px; border-radius: 6px; object-fit: cover; width: 40px;" />', obj.image.url)
        return "No Cover"
    cover_thumbnail.short_description = "Cover"

    # Custom Actions
    @admin.action(description="Mark selected announcements as ACTIVE")
    def make_active(self, request, queryset):
        queryset.update(is_active=True)
        self.message_user(request, "Selected announcements are now active.", messages.SUCCESS)

    @admin.action(description="Mark selected announcements as INACTIVE")
    def make_inactive(self, request, queryset):
        queryset.update(is_active=False)
        self.message_user(request, "Selected announcements have been hidden.", messages.WARNING)


@admin.register(SchoolEvent)
class SchoolEventAdmin(admin.ModelAdmin):
    list_display = ('event_thumbnail', 'title', 'category', 'date', 'time', 'location', 'cost', 'is_active')
    list_editable = ('is_active', 'cost', 'location')
    list_filter = ('category', 'is_active', 'date', 'location')
    search_fields = ('title', 'description', 'location')
    readonly_fields = ('created_at',)

    fieldsets = (
        ('Event Essentials', {
            'fields': ('title', 'category', 'description'),
        }),
        ('Schedules & Assembly Venues', {
            'fields': ('date', 'time', 'location'),
        }),
        ('Pricing & Flysheets', {
            'fields': ('cost', 'image'),
        }),
        ('Publish Status', {
            'fields': ('is_active', 'created_at'),
        }),
    )

    def event_thumbnail(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height: 40px; border-radius: 6px; object-fit: cover; width: 40px;" />', obj.image.url)
        return "No Flyer"
    event_thumbnail.short_description = "Flyer"


@admin.register(AdmissionApplication)
class AdmissionApplicationAdmin(admin.ModelAdmin):
    # Beautiful multi-column layouts for list viewing
    list_display = (
        'full_name', 'class_applied', 'previous_school', 
        'parent_name', 'parent_phone', 
        'payment_status_badge', 'payment_reference', 'created_at'
    )
    list_filter = ('class_applied', 'gender', 'payment_status', 'payment_method', 'created_at')
    
    # Enable search by multiple relevant keys including student and parent references
    search_fields = (
        'first_name', 'last_name', 'parent_name', 
        'parent_phone', 'parent_email', 'payment_reference'
    )
    
    readonly_fields = (
        'application_id', 'created_at', 'result_slip_preview', 
        'recommendation_letter_preview'
    )

    actions = ['approve_fees_payment', 'reset_fees_payment']

    fieldsets = (
        ('Student Primary Demographics', {
            'fields': ('application_id', 'first_name', 'last_name', 'gender', 'date_of_birth'),
        }),
        ('Parent / Guardian Details', {
            'fields': ('parent_name', 'parent_phone', 'parent_email', 'parent_address'),
        }),
        ('Enrollment & Academic Records', {
            'fields': ('class_applied', 'previous_school', 'ple_aggregates', 'uce_division'),
        }),
        ('Submitted Document Attachments', {
            'fields': ('result_slip_file', 'result_slip_preview', 'recommendation_file', 'recommendation_letter_preview'),
            'classes': ('collapse',),
            'description': 'Review certificates and headteacher endorsement letters.'
        }),
        ('Escrow Application Fee Ledger', {
            'fields': ('payment_method', 'payment_phone', 'payment_reference', 'payment_status', 'created_at'),
        }),
    )

    def full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"
    full_name.short_description = "Student Name"

    def payment_status_badge(self, obj):
        # Generates colored labels inside admin lists for clear status tracking
        if obj.payment_status == 'paid':
            color = 'background-color: #d1fae5; color: #065f46; border: 1px solid #a7f3d0;'
            label = "Fully Paid"
        elif obj.payment_status == 'processing':
            color = 'background-color: #fef3c7; color: #92400e; border: 1px solid #fde68a;'
            label = "Processing"
        else:
            color = 'background-color: #fee2e2; color: #991b1b; border: 1px solid #fca5a5;'
            label = "Pending"
        
        return format_html(
            '<span style="padding: 4px 8px; border-radius: 9999px; font-size: 10px; font-weight: bold; uppercase; {}">{}</span>',
            color, label
        )
    payment_status_badge.short_description = "Fee Ledger Status"

    def result_slip_preview(self, obj):
        if obj.result_slip_file:
            return format_html('<a href="{}" target="_blank" style="font-weight:bold; color:#0e7490;">View / Download Document 🔗</a>', obj.result_slip_file.url)
        return "No document uploaded"
    result_slip_preview.short_description = "Result Slip Attachment"

    def recommendation_letter_preview(self, obj):
        if obj.recommendation_file:
            return format_html('<a href="{}" target="_blank" style="font-weight:bold; color:#0e7490;">View / Download Document 🔗</a>', obj.recommendation_file.url)
        return "No document uploaded"
    recommendation_letter_preview.short_description = "Recommendation Letter"

    # Custom Admin Actions
    @admin.action(description="Verify & Mark application fees as FULLY PAID")
    def approve_fees_payment(self, request, queryset):
        updated = queryset.update(payment_status='paid')
        self.message_user(
            request, 
            f"Successfully updated status. {updated} application(s) have been verified as fully paid.", 
            messages.SUCCESS
        )

    @admin.action(description="Reset fees status to PENDING")
    def reset_fees_payment(self, request, queryset):
        updated = queryset.update(payment_status='pending')
        self.message_user(
            request, 
            f"Reset {updated} application fee accounts back to pending status.", 
            messages.WARNING
        )


@admin.register(AlumniRegistry)
class AlumniRegistryAdmin(admin.ModelAdmin):
    list_display = ('photo_preview', 'name', 'graduation_year', 'current_profession', 'is_approved', 'created_at')
    list_editable = ('is_approved', 'current_profession')
    list_filter = ('is_approved', 'graduation_year')
    search_fields = ('name', 'current_profession', 'quote', 'memory_text')
    readonly_fields = ('created_at',)

    actions = ['approve_memories', 'disapprove_memories']

    fieldsets = (
        ('Biographic Identity', {
            'fields': ('name', 'graduation_year', 'current_profession'),
        }),
        ('Alumni Board Content', {
            'fields': ('quote', 'memory_text', 'photo'),
        }),
        ('Moderation & Status Check', {
            'fields': ('is_approved', 'created_at'),
        }),
    )

    def photo_preview(self, obj):
        if obj.photo:
            return format_html('<img src="{}" style="max-height: 40px; border-radius: 9999px; object-fit: cover; width: 40px; border: 2px solid #ddd;" />', obj.photo.url)
        return "No Photo"
    photo_preview.short_description = "Avatar"

    @admin.action(description="Approve selected alumni listings to public boards")
    def approve_memories(self, request, queryset):
        queryset.update(is_approved=True)
        self.message_user(request, "Selected entries have been approved and published.", messages.SUCCESS)

    @admin.action(description="Revoke approval for selected listings")
    def disapprove_memories(self, request, queryset):
        queryset.update(is_approved=False)
        self.message_user(request, "Approval has been revoked. Entries hidden from public.", messages.WARNING)


@admin.register(FAQItem)
class FAQItemAdmin(admin.ModelAdmin):
    list_display = ('question', 'category', 'order')
    list_editable = ('category', 'order')
    list_filter = ('category',)
    search_fields = ('question', 'answer')
    ordering = ('category', 'order')


@admin.register(StaffMember)
class StaffMemberAdmin(admin.ModelAdmin):
    list_display = ('photo_thumbnail', 'name', 'role', 'category', 'email', 'order', 'is_active')
    list_editable = ('order', 'is_active', 'category')
    list_filter = ('category', 'is_active')
    search_fields = ('name', 'role', 'bio', 'email', 'phone')
    readonly_fields = ('created_at', 'photo_preview')
    
    actions = ['activate_staff', 'deactivate_staff']

    fieldsets = (
        ('Staff Professional Identity', {
            'fields': ('name', 'role', 'category'),
        }),
        ('Professional Bio & Philosophy', {
            'fields': ('bio',),
        }),
        ('Contact Coordinates', {
            'fields': ('email', 'phone'),
        }),
        ('Portrait Graphic & Previews', {
            'fields': ('photo', 'photo_preview'),
        }),
        ('Display Sequences & Status', {
            'fields': ('order', 'is_active', 'created_at'),
        }),
    )

    def photo_preview(self, obj):
        if obj.photo:
            return format_html('<img src="{}" style="max-height: 200px; border-radius: 12px; border: 1px solid #ccc;" />', obj.photo.url)
        return "No photo uploaded yet"
    photo_preview.short_description = "Active Portrait Preview"

    def photo_thumbnail(self, obj):
        if obj.photo:
            return format_html('<img src="{}" style="max-height: 44px; border-radius: 9999px; object-fit: cover; width: 44px; border: 2px solid #ddd;" />', obj.photo.url)
        return "No Photo"
    photo_thumbnail.short_description = "Portrait"

    @admin.action(description="Activate selected staff profiles on public directory")
    def activate_staff(self, request, queryset):
        queryset.update(is_active=True)
        self.message_user(request, "Selected staff members are now visible.", messages.SUCCESS)

    @admin.action(description="Hide selected staff profiles from directory")
    def deactivate_staff(self, request, queryset):
        queryset.update(is_active=False)
        self.message_user(request, "Selected staff members have been hidden.", messages.WARNING)

