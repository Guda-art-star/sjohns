from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid

class HeroSlide(models.Model):
    """
    Manages the home page sliding banners with support for titles, subtitles, 
    call-to-actions, and background graphics.
    """
    title = models.CharField(max_length=200, help_text="Main bold header for the slide.")
    subtitle = models.CharField(max_length=300, help_text="Smaller subtitle to accompany the main heading.")
    image = models.ImageField(upload_to='uploads/hero/', help_text="Exquisite high-resolution background banner image.")
    order = models.PositiveIntegerField(default=0, help_text="Sort order priority (lower numbers shown first).")
    is_active = models.BooleanField(default=True, help_text="Toggle visibility on the homepage.")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = "Hero Slide"
        verbose_name_plural = "1. Hero Slides"

    def __str__(self):
        return f"Slide {self.order}: {self.title}"


class KeyPillar(models.Model):
    """
    Represents core values/pillars shown on the website (e.g. Academic Excellence, Sports, Spiritual).
    """
    title = models.CharField(max_length=100, help_text="e.g. 'Academic Excellence'")
    icon_name = models.CharField(max_length=50, help_text="Lucide icon name (e.g., 'BookOpen', 'Award', 'ShieldCheck').")
    description = models.TextField(help_text="Detailed narrative describing the pillar.")
    bg_color = models.CharField(max_length=50, default="bg-sky-50", help_text="Tailwind background class (e.g., 'bg-amber-50', 'bg-emerald-50').")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Key Pillar"
        verbose_name_plural = "2. Key Pillars"

    def __str__(self):
        return self.title


class Announcement(models.Model):
    """
    School announcements, bulletins, and recent news articles.
    """
    CATEGORY_CHOICES = [
        ('academic', 'Academic'),
        ('sports', 'Sports & Co-curricular'),
        ('general', 'General Circular'),
        ('admission', 'Admissions'),
    ]

    title = models.CharField(max_length=200, help_text="Title of the announcement.")
    slug = models.SlugField(max_length=250, unique=True, blank=True, help_text="URL-friendly slug. Auto-generated if left blank.")
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='general')
    date = models.DateField(help_text="Date associated with publication or relevance.")
    content = models.TextField(help_text="Full markdown or HTML content of the announcement.")
    excerpt = models.TextField(max_length=300, help_text="Short scannable snippet displayed in the card list.")
    image = models.ImageField(upload_to='uploads/announcements/', blank=True, null=True, help_text="Optional cover image.")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date', '-created_at']
        verbose_name = "Announcement"
        verbose_name_plural = "3. Announcements"

    def __str__(self):
        return f"[{self.get_category_display()}] {self.title}"


class SchoolEvent(models.Model):
    """
    Upcoming calendar events shown on the grid, including venues, costs, and timings.
    """
    CATEGORY_CHOICES = [
        ('sports', 'Sports & Games'),
        ('academic', 'Academics & Tests'),
        ('religious', 'Spiritual & Chapel'),
        ('cultural', 'Cultural & Music'),
        ('social', 'Social & Charity'),
    ]

    title = models.CharField(max_length=200)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='academic')
    date = models.DateField(help_text="Event Date.")
    time = models.CharField(max_length=50, placeholder="e.g. 9:00 AM - 4:00 PM", help_text="Time string.")
    location = models.CharField(max_length=200, default="School Campus, Mpigi", help_text="e.g., 'School Main Assembly Hall'")
    cost = models.CharField(max_length=100, default="Free Entry", help_text="e.g., 'Free' or '10,000 UGX'")
    description = models.TextField(help_text="Description of the event details.")
    image = models.ImageField(upload_to='uploads/events/', blank=True, null=True, help_text="Cover flyer image.")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['date', 'time']
        verbose_name = "School Event"
        verbose_name_plural = "4. School Events"

    def __str__(self):
        return f"{self.date}: {self.title}"


class AdmissionApplication(models.Model):
    """
    Manages applications submitted online, including student demographics, 
    parent information, previous academic performance, file uploads, and fee payment status.
    """
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
    ]
    CLASS_CHOICES = [
        ('S1', 'Senior One (S.1)'),
        ('S2', 'Senior Two (S.2)'),
        ('S3', 'Senior Three (S.3)'),
        ('S4', 'Senior Four (S.4)'),
        ('S5_ARTS', 'Senior Five Arts (S.5)'),
        ('S5_SCI', 'Senior Five Sciences (S.5)'),
        ('S6_ARTS', 'Senior Six Arts (S.6)'),
        ('S6_SCI', 'Senior Six Sciences (S.6)'),
    ]
    PAYMENT_METHOD_CHOICES = [
        ('mtn', 'MTN Mobile Money'),
        ('airtel', 'Airtel Money'),
        ('centenary', 'Centenary Bank'),
        ('stanbic', 'Stanbic Bank'),
    ]
    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending Payment'),
        ('processing', 'Processing verification'),
        ('paid', 'Fully Paid & Cleared'),
    ]

    application_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    
    # 1. Student Information
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    previous_school = models.CharField(max_length=150)
    class_applied = models.CharField(max_length=15, choices=CLASS_CHOICES)

    # 2. Parent / Guardian Information
    parent_name = models.CharField(max_length=150, verbose_name="Parent/Guardian Full Name")
    parent_phone = models.CharField(max_length=50, verbose_name="Parent Phone Number")
    parent_email = models.EmailField(blank=True, verbose_name="Parent Email Address")
    parent_address = models.CharField(max_length=200, verbose_name="Parent Residential Address")

    # 3. Academic Achievements & Uploads
    ple_aggregates = models.PositiveIntegerField(
        blank=True, null=True, 
        validators=[MinValueValidator(4), MaxValueValidator(36)],
        verbose_name="PLE Aggregates (if S.1 entry)",
        help_text="Primary Leaving Exam aggregates (best 4, 4 to 36)."
    )
    uce_division = models.CharField(
        max_length=20, blank=True, null=True, 
        verbose_name="UCE Division (if A-Level S.5/6 entry)",
        help_text="Uganda Certificate of Education Division/Grade (e.g. Division 1, Division 2)."
    )
    result_slip_file = models.FileField(
        upload_to='uploads/result_slips/', 
        blank=True, null=True,
        verbose_name="Academic Result Slip",
        help_text="PDF or Image copy of primary/UCE result slip."
    )
    recommendation_file = models.FileField(
        upload_to='uploads/recommendations/', 
        blank=True, null=True,
        verbose_name="Recommendation Letter",
        help_text="PDF or Image of recommendation from previous headteacher."
    )

    # 4. Escrow Application Payment Details
    application_fee_ugx = models.PositiveIntegerField(default=50000, editable=False)
    payment_method = models.CharField(max_length=15, choices=PAYMENT_METHOD_CHOICES)
    payment_phone = models.CharField(max_length=50, blank=True, help_text="Phone number that completed Mobile Money authorization.")
    payment_reference = models.CharField(max_length=100, unique=True, help_text="Auto-generated unique escrow reference number (e.g. STJ-APP-XXXXXX).")
    payment_status = models.CharField(max_length=15, choices=PAYMENT_STATUS_CHOICES, default='pending')

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Admission Application"
        verbose_name_plural = "5. Admission Applications"

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.get_class_applied_display()}"


class AlumniRegistry(models.Model):
    """
    Stores alumni registry details, memory card boards, quotes, and memories.
    Requires administrator moderation approval before publishing on the public boards.
    """
    name = models.CharField(max_length=150)
    graduation_year = models.PositiveIntegerField(
        validators=[MinValueValidator(2000), MaxValueValidator(2030)],
        help_text="Year of graduation from St. John's College."
    )
    current_profession = models.CharField(max_length=150, blank=True, help_text="e.g., Software Engineer at Google, Medical Officer, etc.")
    quote = models.CharField(max_length=250, blank=True, help_text="A memorable quote, motto, or inspirational message.")
    memory_text = models.TextField(blank=True, help_text="Detailed story or recollection of SJC days.")
    photo = models.ImageField(upload_to='uploads/alumni/', blank=True, null=True, help_text="Upload a picture for the alumni registry board.")
    is_approved = models.BooleanField(default=False, verbose_name="Moderation Approval", help_text="Check to approve showing this entry on the public website.")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-graduation_year', '-created_at']
        verbose_name = "Alumni Registry Entry"
        verbose_name_plural = "6. Alumni & Memories"

    def __str__(self):
        status = "Approved" if self.is_approved else "Pending Approval"
        return f"{self.name} (Class of {self.graduation_year}) - {status}"


class FAQItem(models.Model):
    """
    School FAQs (Frequently Asked Questions) managed via the dashboard.
    """
    CATEGORY_CHOICES = [
        ('academics', 'Academics & Registration'),
        ('boarding', 'Boarding & Student Welfare'),
        ('admissions', 'Admissions & Fees'),
        ('general', 'General Inquiries'),
    ]

    question = models.CharField(max_length=250)
    answer = models.TextField()
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='general')
    order = models.PositiveIntegerField(default=0, help_text="Display priority order.")

    class Meta:
        ordering = ['category', 'order']
        verbose_name = "FAQ Item"
        verbose_name_plural = "7. FAQs"

    def __str__(self):
        return f"[{self.get_category_display()}] {self.question}"


class StaffMember(models.Model):
    """
    Faculty profiles (administrators, teaching staff, support staff) managed by SJC administrators.
    """
    CATEGORY_CHOICES = [
        ('admin', 'Administration'),
        ('teaching', 'Teaching Staff'),
        ('support', 'Support Staff / Allied Staff'),
    ]

    name = models.CharField(max_length=150, help_text="Full Name of the staff member (e.g., Mr. Mukasa John).")
    role = models.CharField(max_length=100, help_text="Official Title/Role (e.g., Headteacher, Deputy Academic, Head of Chemistry).")
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='teaching')
    email = models.EmailField(blank=True, help_text="Official school email address.")
    phone = models.CharField(max_length=50, blank=True, help_text="Optional contact number.")
    bio = models.TextField(help_text="Detailed profile bio, background, qualification or philosophy.")
    photo = models.ImageField(upload_to='uploads/staff/', blank=True, null=True, help_text="Upload high-quality professional passport-size portrait photo.")
    order = models.PositiveIntegerField(default=0, help_text="Custom display order priority (lower numbers shown first).")
    is_active = models.BooleanField(default=True, help_text="Toggle visibility on the public website directory.")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['category', 'order', 'name']
        verbose_name = "Staff Member"
        verbose_name_plural = "8. Staff Directory"

    def __str__(self):
        return f"{self.name} - {self.role} ({self.get_category_display()})"

