from .models import Article, Category
from django.contrib import admin


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = 'pk', 'title', 'type', 'category', 'creation_date', 'update_date',
    list_display_links = 'pk', 'title', 'type', 'category',
    ordering = 'pk', 'title', 'type', 'category',
    search_fields = 'title', 'type', 'category',


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = 'pk', 'name',
    list_display_links = 'pk', 'name',
    ordering = 'pk', 'name',
    search_fields = 'name',
