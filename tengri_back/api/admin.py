from django.contrib import admin
from api.models import Category,News
# Register your models here.

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name', )

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('id','title')
    search_fields = ('title',)
