# Generated by Django 5.1.1 on 2024-11-05 15:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usecase', '0004_usecasespecification_alter_alternativepath_use_case_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='basicpath',
            name='use_case',
        ),
        migrations.RemoveField(
            model_name='exceptionpath',
            name='use_case',
        ),
        migrations.RenameField(
            model_name='usecasespecification',
            old_name='post_conditions',
            new_name='postconditions',
        ),
        migrations.RenameField(
            model_name='usecasespecification',
            old_name='pre_conditions',
            new_name='preconditions',
        ),
        migrations.RenameField(
            model_name='usecasespecification',
            old_name='summary_description',
            new_name='specification_desc',
        ),
        migrations.RemoveField(
            model_name='usecasespecification',
            name='actor',
        ),
        migrations.RemoveField(
            model_name='usecasespecification',
            name='id',
        ),
        migrations.RemoveField(
            model_name='usecasespecification',
            name='use_case_name',
        ),
        migrations.AddField(
            model_name='usecasespecification',
            name='specification_id',
            field=models.CharField(default=123, max_length=10, primary_key=True, serialize=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='usecasespecification',
            name='specification_name',
            field=models.CharField(default=1234, max_length=30),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='usecasespecification',
            name='use_case',
            field=models.ForeignKey(default=12345, on_delete=django.db.models.deletion.CASCADE, to='usecase.usecase'),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='Path',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('path_type', models.CharField(choices=[('basic', 'Basic Path'), ('alternative', 'Alternative Path'), ('exception', 'Exception Path')], max_length=20)),
                ('actor_step', models.TextField()),
                ('system_step', models.TextField()),
                ('use_case_specification', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='paths', to='usecase.usecasespecification')),
            ],
        ),
        migrations.DeleteModel(
            name='AlternativePath',
        ),
        migrations.DeleteModel(
            name='BasicPath',
        ),
        migrations.DeleteModel(
            name='ExceptionPath',
        ),
    ]
