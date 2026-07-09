from django import forms
from .models import AdmissionApplication, AlumniRegistry

class AdmissionForm(forms.ModelForm):
    """
    Form to collect student online admission applications via Django's visual frontend templates.
    """
    class Meta:
        model = AdmissionApplication
        fields = [
            'first_name', 'last_name', 'date_of_birth', 'gender', 'previous_school', 'class_applied',
            'parent_name', 'parent_phone', 'parent_email', 'parent_address',
            'ple_aggregates', 'uce_division', 'result_slip_file', 'recommendation_file',
            'payment_method', 'payment_phone'
        ]
        widgets = {
            'date_of_birth': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
            'first_name': forms.TextInput(attrs={'placeholder': 'Enter first name'}),
            'last_name': forms.TextInput(attrs={'placeholder': 'Enter last name'}),
            'previous_school': forms.TextInput(attrs={'placeholder': 'Previous Primary/Secondary School'}),
            'parent_name': forms.TextInput(attrs={'placeholder': "Parent's full name"}),
            'parent_phone': forms.TextInput(attrs={'placeholder': 'e.g., +256772123456'}),
            'parent_email': forms.EmailInput(attrs={'placeholder': 'parent@example.com'}),
            'parent_address': forms.TextInput(attrs={'placeholder': 'Residential Town, District'}),
            'ple_aggregates': forms.NumberInput(attrs={'placeholder': 'Best 4 aggregate (4 - 36)'}),
            'uce_division': forms.TextInput(attrs={'placeholder': 'e.g., Division 1, Grade 12'}),
            'payment_phone': forms.TextInput(attrs={'placeholder': 'e.g., MoMo sender number if mobile money'}),
        }

    def clean_payment_phone(self):
        payment_method = self.cleaned_data.get('payment_method')
        payment_phone = self.cleaned_data.get('payment_phone')
        if payment_method in ['mtn', 'airtel'] and not payment_phone:
            raise forms.ValidationError("Please provide a phone number to trigger the mobile payment push.")
        return payment_phone


class AlumniForm(forms.ModelForm):
    """
    Allows Alumni students to log their memories, career profiles, and group photos.
    """
    class Meta:
        model = AlumniRegistry
        fields = ['name', 'graduation_year', 'current_profession', 'quote', 'memory_text', 'photo']
        widgets = {
            'name': forms.TextInput(attrs={'placeholder': 'Your full name'}),
            'graduation_year': forms.NumberInput(attrs={'placeholder': 'e.g., 2018'}),
            'current_profession': forms.TextInput(attrs={'placeholder': 'e.g., Medical Officer at Mulago'}),
            'quote': forms.TextInput(attrs={'placeholder': 'Your senior quote or favorite school memory line...'}),
            'memory_text': forms.Textarea(attrs={'rows': 4, 'placeholder': 'Tell us about your times at St. John\'s College...'}),
        }
