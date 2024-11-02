document.getElementById('save-button').addEventListener('click', function (e) {
    e.preventDefault();

    const formData = new FormData(document.getElementById('use-case-form'));
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    formData.append('csrfmiddlewaretoken', csrfToken);

    fetch("{% url 'use_case_result' %}", {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert(data.message);
            } else {
                alert('Failed to save data.');
            }
        })
        .catch(error => console.error('Error:', error));
});


let actorCount = 1;
let featureMarginIncrement = 30;

function updateMargin(amount) {
    const mainElement = document.querySelector('.main');
    const currentMargin = parseInt(getComputedStyle(mainElement).marginTop) || 0;
    mainElement.style.marginTop = `${currentMargin + amount}px`;
}

document.getElementById('add-actor').addEventListener('click', function () {
    const currentActorGroups = document.querySelectorAll('.actor-group').length;
    actorCount = currentActorGroups + 1;

    const actorContainer = document.getElementById('actor-container');

    const newActorGroup = document.createElement('div');
    newActorGroup.className = "actor-group d-flex mt-3";
    newActorGroup.innerHTML = `
            <div class="actor-column" style="flex: 1;">
                <input type="text" id="actor${actorCount}" name="actor${actorCount}" class="form-control" placeholder="Actor ${actorCount}" required>
                <button type="button" class="btn btn-danger mt-2 remove-actor">- Remove Actor</button>
            </div>
            <div class="feature-column" style="flex: 1;" data-actor="${actorCount}">
                <div class="feature-field">
                    <div class="d-flex justify-content-between align-items-center">
                        <input type="text" id="feature${actorCount}_1" name="feature${actorCount}_1" class="form-control" placeholder="Feature 1" required>
                    </div>
                </div>
                <button type="button" class="btn btn-secondary mt-2 add-feature" data-actor="${actorCount}">+ Add Feature</button>
            </div>
        `;

    actorContainer.appendChild(newActorGroup);
    updateMargin(featureMarginIncrement);
});

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('add-feature')) {
        const actorNumber = e.target.getAttribute('data-actor');
        const featureColumn = e.target.parentElement;
        const featureCount = featureColumn.querySelectorAll('.feature-field').length + 1;

        const newFeatureField = document.createElement('div');
        newFeatureField.className = 'feature-field mt-2';
        newFeatureField.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <input type="text" id="feature${actorNumber}_${featureCount}" name="feature${actorNumber}_${featureCount}" class="form-control" placeholder="Feature ${featureCount}">
                    <button type="button" class="btn btn-danger remove-feature" style="min-width: 40px; padding: 0;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        featureColumn.insertBefore(newFeatureField, e.target);
        updateMargin(featureMarginIncrement);
    }

    if (e.target.classList.contains('remove-feature')) {
        const featureField = e.target.closest('.feature-field');
        const featureColumn = featureField.parentElement;
        featureField.remove();

        const featureFields = featureColumn.querySelectorAll('.feature-field');
        featureFields.forEach((field, index) => {
            const input = field.querySelector('input');
            const actorNumber = featureColumn.getAttribute('data-actor');
            input.setAttribute('id', `feature${actorNumber}_${index + 1}`);
            input.setAttribute('name', `feature${actorNumber}_${index + 1}`);
            input.setAttribute('placeholder', `Feature ${index + 1}`);
        });
        updateMargin(-featureMarginIncrement);
    }

    if (e.target.classList.contains('remove-actor')) {
        const actorGroup = e.target.closest('.actor-group');
        actorGroup.remove();
        updateMargin(-featureMarginIncrement);

        const actorGroups = document.querySelectorAll('.actor-group');
        actorGroups.forEach((group, index) => {
            const actorInput = group.querySelector('.actor-column input');
            actorInput.setAttribute('id', `actor${index + 1}`);
            actorInput.setAttribute('name', `actor${index + 1}`);
            actorInput.setAttribute('placeholder', `Actor ${index + 1}`);

            const featureColumn = group.querySelector('.feature-column');
            featureColumn.setAttribute('data-actor', `${index + 1}`);

            const featureFields = featureColumn.querySelectorAll('.feature-field input');
            featureFields.forEach((input, featureIndex) => {
                input.setAttribute('id', `feature${index + 1}_${featureIndex + 1}`);
                input.setAttribute('name', `feature${index + 1}_${featureIndex + 1}`);
                input.setAttribute('placeholder', `Feature ${featureIndex + 1}`);
            });

            const addFeatureButton = featureColumn.querySelector('.add-feature');
            addFeatureButton.setAttribute('data-actor', `${index + 1}`);
        });
    }
});

