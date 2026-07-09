from django.urls import path
from . import views

urlpatterns = [
    # Static & Dynamic HTML views
    path('', views.index, name='index'),
    path('apply-online/', views.apply_online, name='apply_online'),
    path('apply-online/checkout/<uuid:application_id>/', views.payment_checkout, name='payment_checkout'),
    path('apply-online/receipt/<uuid:application_id>/', views.application_receipt, name='application_receipt'),
    path('alumni-board/', views.alumni_board, name='alumni_board'),
    path('faqs/', views.faq_list, name='faq_list'),
    path('staff-directory/', views.staff_directory, name='staff_directory'),
    
    # REST-like Sync APIs
    path('api/announcements/', views.api_announcements, name='api_announcements'),
    path('api/events/', views.api_events, name='api_events'),
    path('api/staff/', views.api_staff, name='api_staff'),
]
