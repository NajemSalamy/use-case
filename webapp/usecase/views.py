from django.http import JsonResponse
from django.shortcuts import render, redirect
from .models import ActorFeature, AlternativePath, BasicPath, ExceptionPath, UseCaseSpecification  # Import your ActorFeature model


def UseCaseDiagram(request):
    # Ambil semua fitur unik dari model ActorFeature
    features = list(ActorFeature.objects.values_list('feature_name', flat=True).distinct())
    print("Features available:", features)  # Debugging log
    
    context = {
        'features': features,
        'nama': 'hello world',
    }
    
    # Cetak untuk memeriksa apakah 'context' memiliki data yang benar
    print("Context features:", context['features'])  # Debugging log
    
    return render(request, 'use case diagram page/UseCaseDiagram.html', context)


def save_specification(request):
    if request.method == 'POST':
        # Ambil data dari form
        use_case_name = request.POST.get('use_case_name')
        actor_name = request.POST.get('actor')
        summary_description = request.POST.get('summary_description')
        pre_conditions = request.POST.get('pre_conditions')
        post_conditions = request.POST.get('post_conditions')

        print("Received data:", use_case_name, actor_name, summary_description, pre_conditions, post_conditions) 

        # Buat objek UseCaseSpecification
        specification = UseCaseSpecification.objects.create(
            use_case_name=use_case_name,
            actor=actor_name,  # Mengisi kolom actor
            summary_description=summary_description,
            pre_conditions=pre_conditions,
            post_conditions=post_conditions
        )

        # Menyimpan langkah-langkah dalam Basic Path
        basic_actor_step = request.POST.getlist('basic_actor_step[]')
        basic_system_step = request.POST.getlist('basic_system_step[]')
        for actor_step, system_step in zip(basic_actor_step, basic_system_step):
            if actor_step.strip() or system_step.strip():
                BasicPath.objects.create(
                    use_case_specification=specification,
                    basic_actor_step=actor_step,
                    basic_system_step=system_step
                )

       # Menyimpan langkah-langkah dalam Alternative Path
        alternative_actor_step = request.POST.getlist('alternative_actor_step[]')
        alternative_system_step = request.POST.getlist('alternative_system_step[]')
        for actor_step, system_step in zip(alternative_actor_step, alternative_system_step):
            if actor_step.strip() or system_step.strip():
                AlternativePath.objects.create(
                    use_case_specification=specification,
                    alternative_actor_step=actor_step,
                    alternative_system_step=system_step
                )

        # Menyimpan langkah-langkah dalam Exception Path
        exception_actor_step = request.POST.getlist('exception_actor_step[]')
        exception_system_step = request.POST.getlist('exception_system_step[]')
        for actor_step, system_step in zip(exception_actor_step, exception_system_step):
            if actor_step.strip() or system_step.strip():
                ExceptionPath.objects.create(
                    use_case_specification=specification,
                    exception_actor_step=actor_step,
                    exception_system_step=system_step
                )
        print("Basic Actor Steps:", basic_actor_step)
        print("Basic System Steps:", basic_system_step)
        print("Alternative Actor Steps:", alternative_actor_step)
        print("Alternative System Steps:", alternative_system_step)
        print("Exception Actor Steps:", exception_actor_step)
        print("Exception System Steps:", exception_system_step)


        return redirect('Specification.html')  # Ganti dengan URL yang sesuai

    return render(request, 'Specification.html')  # Ganti dengan template yang sesuai

def use_case_result(request):
    if request.method == 'POST':
        actor_data = []
        
        # Ekstrak data actor dan fitur dari form
        for key, value in request.POST.items():
            if 'actor' in key and value:
                actor_id = key.replace('actor', '')
                
                # Ambil semua fitur yang berhubungan dengan actor ini
                features = [
                    request.POST.get(f'feature{actor_id}_{i}') 
                    for i in range(1, 10)  # Sesuaikan jumlah maksimal fitur jika perlu
                    if request.POST.get(f'feature{actor_id}_{i}')
                ]
                
                for feature in features:
                    # Simpan data actor dan fitur ke dalam database
                    ActorFeature.objects.create(actor_name=value, feature_name=feature)
                    actor_data.append((value, feature))
        
        # Cetak untuk memastikan data actor_data diambil dengan benar
        print("Actor data to save:", actor_data)  # Debugging log

        # Cek apakah request adalah AJAX
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return JsonResponse({'status': 'success', 'message': 'Data berhasil disimpan!'})

        # Render template hasil jika ini adalah POST biasa
        context = {
            'actor_data': actor_data,
            'nama': 'hello world',
        }
        return render(request, 'use case diagram page/use_case_result.html', context)
    
    # Jika request bukan POST
    return render(request, 'use case diagram page/use_case_result.html', {'nama': 'hello world'})

def generate_use_case_diagram(request):
    # Ambil semua fitur unik dari database
    features = list(ActorFeature.objects.values_list('feature_name', flat=True).distinct())
    
    # Cetak untuk memastikan data features tersedia
    print("Features for use case diagram:", features)  # Debugging log
    
    return render(request, 'use case diagram page/use_case_result.html', {'features': features})

def Specification(request):
    context = {
        'nama' : 'hello world',
    }
    return render(request, 'use case specification page/Specification.html', context)

def output_activity(request):
    return render(request, 'output-activity.html')

def input_class(request):
    return render(request, 'class diagram page/inputClass.html')

def input_sequence(request):
    return render(request, 'sequence diagram page/inputsequence.html')

def output_class(request):
    return render(request, 'class diagram page/outputclass.html')

def output_sequence(request):
    return render(request, 'sequence diagram page/outputsequence.html')
