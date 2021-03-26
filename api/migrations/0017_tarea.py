# Generated by Django 2.2.13 on 2021-02-15 19:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_tareaestudiante'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tarea',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.TextField(blank=True, max_length=100, null=True)),
                ('descripcion', models.TextField(blank=True, max_length=200, null=True)),
                ('archivo_tarea', models.ImageField(blank=True, null=True, upload_to='')),
                ('fecha_entrea', models.DateTimeField(auto_now_add=True)),
                ('hora_entrega', models.TimeField(auto_now_add=True)),
                ('nota', models.FloatField(blank=True, null=True)),
                ('creado', models.DateTimeField(auto_now_add=True)),
                ('modificado', models.DateTimeField(auto_now=True)),
                ('activo', models.BooleanField(default=True)),
                ('asignacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Asignacion')),
                ('tarea_estudiante', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.TareaEstudiante')),
            ],
        ),
    ]
