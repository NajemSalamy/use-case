from django.db import models
from django.contrib.auth.models import User

class History(models.Model):
    history_id = models.CharField(max_length=6, primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"History {self.history_id} for User {self.user.username}"

class UseCase(models.Model):
    use_case_id = models.CharField(max_length=10, primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    nama = models.CharField(max_length=30)
    description = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)

    # Uncomment and modify if you have Aktor and Fitur models defined
    # aktor = models.ManyToManyField('Aktor', related_name='usecases')
    # fitur = models.ManyToManyField('Fitur', related_name='usecases')

    def __str__(self):
        return self.nama

class UseCaseSpecification(models.Model):
    specification_id = models.CharField(max_length=10, primary_key=True)
    use_case = models.ForeignKey(UseCase, on_delete=models.CASCADE)
    specification_name = models.CharField(max_length=30)
    exceptions_path = models.TextField()
    preconditions = models.TextField()
    postconditions = models.TextField()
    basic_path = models.TextField()
    alternative_path = models.TextField()
    specification_desc = models.TextField()

    def __str__(self):
        return self.specification_name

class ActorFeature(models.Model):
    actor_name = models.CharField(max_length=255)
    feature_name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.actor_name} - {self.feature_name}"

# Uncomment these classes if you want to define Aktor and Fitur models
# class Aktor(models.Model):
#     nama = models.CharField(max_length=100)

#     def __str__(self):
#         return self.nama

# class Fitur(models.Model):
#     nama = models.CharField(max_length=100)

#     def __str__(self):
#         return self.nama
