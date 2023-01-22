# Generated by Django 4.1.5 on 2023-01-22 10:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
        ('TODO', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='name_project',
            field=models.CharField(max_length=64),
        ),
        migrations.CreateModel(
            name='ToDo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text_note', models.CharField(max_length=256)),
                ('created_note', models.DateTimeField(auto_now_add=True, verbose_name='Created')),
                ('updated_note', models.DateTimeField(auto_now=True, verbose_name='Edited')),
                ('project_note', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='TODO.project')),
                ('user_note', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.users')),
            ],
        ),
    ]
