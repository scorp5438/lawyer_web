from django.contrib import admin

from .models import Cases, Practice


@admin.register(Cases)
class CasesAdmin(admin.ModelAdmin):
    list_display = 'pk', 'name_case','case_category', 'start_date', 'end_date',
    list_display_links = 'pk', 'name_case', 'case_category',
    ordering = 'pk', 'name_case', 'case_category',
    search_fields = 'pk', 'name_case', 'type', 'case_category',


@admin.register(Practice)
class PracticeAdmin(admin.ModelAdmin):
    list_display = 'pk', 'category', 'get_short_description'
    list_display_links = 'pk', 'category',
    ordering = 'pk', 'category',
    search_fields = 'category',


    def get_short_description(self, obj: Practice):
        return f'{obj.description[:20]}...'

    get_short_description.short_description = 'Короткое описание'