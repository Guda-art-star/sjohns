from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import random
from .models import HeroSlide, KeyPillar, Announcement, SchoolEvent, AdmissionApplication, AlumniRegistry, FAQItem, StaffMember
from .forms import AdmissionForm, AlumniForm

def index(request):
    """
    Renders a stunning administrative overview and visitor dashboard.
    """
    slides = HeroSlide.objects.filter(is_active=True)[:5]
    pillars = KeyPillar.objects.all()[:4]
    announcements = Announcement.objects.filter(is_active=True)[:3]
    events = SchoolEvent.objects.filter(is_active=True)[:3]
    
    # Simple analytics counters for the SJC administrator
    stats = {
        'total_admissions': AdmissionApplication.objects.count(),
        'paid_admissions': AdmissionApplication.objects.filter(payment_status='paid').count(),
        'pending_admissions': AdmissionApplication.objects.filter(payment_status='pending').count(),
        'registered_alumni': AlumniRegistry.objects.count(),
        'active_news': Announcement.objects.filter(is_active=True).count(),
        'upcoming_events': SchoolEvent.objects.filter(is_active=True).count(),
        'total_staff': StaffMember.objects.filter(is_active=True).count(),
    }

    context = {
        'slides': slides,
        'pillars': pillars,
        'announcements': announcements,
        'events': events,
        'stats': stats,
    }
    return render(request, 'website/index.html', context)


def apply_online(request):
    """
    Handles student registration submissions.
    Generates a unique reference number and a secure simulated escrow checkout workflow.
    """
    if request.method == 'POST':
        form = AdmissionForm(request.POST, request.FILES)
        if form.is_valid():
            application = form.save(commit=False)
            
            # Generate a professional unique escrow reference number
            rand_code = random.randint(100000, 999999)
            application.payment_reference = f"STJ-APP-{rand_code}"
            
            # Save to generate id and persist documents
            application.save()
            
            messages.success(request, f"Application for {application.first_name} has been received! Please verify escrow payment below to complete.")
            return redirect('payment_checkout', application_id=application.application_id)
        else:
            messages.error(request, "Please correct the errors in the form below.")
    else:
        form = AdmissionForm()
        
    return render(request, 'website/apply_online.html', {'form': form})


def payment_checkout(request, application_id):
    """
    A beautiful simulated checkout page. Allows verifying transactions, generating
    biller codes, and simulating the payment status inside the database.
    """
    application = get_object_or_404(AdmissionApplication, application_id=application_id)
    
    if request.method == 'POST':
        # Simulate instant clearing gateway
        application.payment_status = 'paid'
        application.save()
        messages.success(request, "🎉 Escrow payment verified and application fully cleared!")
        return redirect('application_receipt', application_id=application.application_id)
        
    context = {
        'application': application,
        # Determine specific biller instructions based on selection
        'biller_instructions': {
            'mtn': {
                'code': '*165*4*4# (Merchant Code: 620459)',
                'biller_name': "St. John's College - Application Escrow",
            },
            'airtel': {
                'code': '*185*9# (Biller ID: 1120492)',
                'biller_name': "St. John's College Mpigi Collection",
            },
            'centenary': {
                'code': '310004928104 (Centenary Bank)',
                'biller_name': "ST. JOHNS COLLEGE MPIGI - FEES",
            },
            'stanbic': {
                'code': '903001859204 (Stanbic Bank)',
                'biller_name': "ST. JOHNS COLLEGE MPIGI MAIN",
            },
        }.get(application.payment_method, {
            'code': 'N/A',
            'biller_name': "St. John's College Main Escrow",
        })
    }
    return render(request, 'website/payment_checkout.html', context)


def application_receipt(request, application_id):
    """
    Displays a printable receipt for fully verified applications.
    """
    application = get_object_or_404(AdmissionApplication, application_id=application_id)
    return render(request, 'website/receipt.html', {'app': application})


def alumni_board(request):
    """
    Displays public approved alumni and lets graduates register.
    """
    alumni_list = AlumniRegistry.objects.filter(is_approved=True)
    
    if request.method == 'POST':
        form = AlumniForm(request.POST, request.FILES)
        if form.is_valid():
            form.save() # Saves as unapproved (is_approved=False) by default for safety moderation
            messages.info(request, "Thank you! Your profile has been sent to the administrator for moderation approval.")
            return redirect('alumni_board')
    else:
        form = AlumniForm()
        
    return render(request, 'website/alumni_board.html', {
        'form': form,
        'alumni_list': alumni_list
    })


def faq_list(request):
    """
    Simple list of school FAQs categorized.
    """
    categories = FAQItem.CATEGORY_CHOICES
    categorized_faqs = {}
    for cat_key, cat_val in categories:
        items = FAQItem.objects.filter(category=cat_key)
        if items.exists():
            categorized_faqs[cat_val] = items
            
    return render(request, 'website/faq.html', {'categorized_faqs': categorized_faqs})


# REST APIs for external consumption (e.g. sync with React Vite app if needed)
def api_announcements(request):
    items = Announcement.objects.filter(is_active=True)
    data = []
    for i in items:
        data.append({
            'title': i.title,
            'category': i.category,
            'date': i.date.strftime('%Y-%m-%d'),
            'excerpt': i.excerpt,
            'image_url': i.image.url if i.image else None,
        })
    return JsonResponse({'status': 'success', 'data': data})


def api_events(request):
    items = SchoolEvent.objects.filter(is_active=True)
    data = []
    for i in items:
        data.append({
            'title': i.title,
            'category': i.category,
            'date': i.date.strftime('%Y-%m-%d'),
            'time': i.time,
            'location': i.location,
            'cost': i.cost,
            'description': i.description,
            'image_url': i.image.url if i.image else None,
        })
    return JsonResponse({'status': 'success', 'data': data})


def staff_directory(request):
    """
    Renders a stunning staff directory of St. John's College, categorized beautifully.
    """
    categories = StaffMember.CATEGORY_CHOICES
    categorized_staff = {}
    for cat_key, cat_val in categories:
        items = StaffMember.objects.filter(category=cat_key, is_active=True).order_by('order', 'name')
        if items.exists():
            categorized_staff[cat_val] = items

    return render(request, 'website/staff_directory.html', {
        'categorized_staff': categorized_staff
    })


def api_staff(request):
    """
    REST-like JSON API to return all active staff members.
    """
    items = StaffMember.objects.filter(is_active=True).order_by('category', 'order', 'name')
    data = []
    for i in items:
        data.append({
            'name': i.name,
            'role': i.role,
            'category': i.get_category_display(),
            'email': i.email,
            'phone': i.phone,
            'bio': i.bio,
            'photo_url': i.photo.url if i.photo else None,
        })
    return JsonResponse({'status': 'success', 'data': data})

