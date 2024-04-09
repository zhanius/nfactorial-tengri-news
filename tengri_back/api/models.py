from django.db import models

# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return f'ID: {self.id}, Name: {self.name}'

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'


class News(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    publish_date = models.DateTimeField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    photo = models.TextField()


    def __str__(self):
        return f'ID: {self.id}, Title: {self.title}'


    def to_json(self):
        return {
            'id': self.id,
            'title': self.title,
            'date': self.publish_date,
            'category': self.category.name,
            'photo': self.photo
        }

    class Meta:
        verbose_name = 'News'
        verbose_name_plural = 'News'




