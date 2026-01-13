<template>
    <div class="user-profile-form">
        <form @submit.prevent="handleSubmit" class="profile-form">
            <div class="form-grid">
                <div class="form-field">
                    <label for="name" class="form-label">Nome Completo</label>
                    <InputText
                        id="name"
                        v-model="formData.name"
                        placeholder="Digite seu nome completo"
                        :invalid="!!errors.name"
                        class="w-full"
                    />
                    <small v-if="errors.name" class="form-error">{{ errors.name }}</small>
                </div>

                <div class="form-field">
                    <label for="birthDate" class="form-label">Data de Nascimento</label>
                    <DatePicker
                        id="birthDate"
                        v-model="birthDateValue"
                        dateFormat="dd/mm/yy"
                        placeholder="DD/MM/AAAA"
                        :invalid="!!errors.birthDate"
                        :maxDate="maxDate"
                        showIcon
                        iconDisplay="input"
                        class="w-full"
                    />
                    <small v-if="errors.birthDate" class="form-error">{{ errors.birthDate }}</small>
                </div>

                <div class="form-field">
                    <label for="address" class="form-label">Endereço</label>
                    <InputText
                        id="address"
                        v-model="formData.address"
                        placeholder="Digite seu endereço"
                        :invalid="!!errors.address"
                        class="w-full"
                    />
                    <small v-if="errors.address" class="form-error">{{ errors.address }}</small>
                </div>

                <div class="form-field">
                    <label for="profession" class="form-label">Profissão</label>
                    <InputText
                        id="profession"
                        v-model="formData.profession"
                        placeholder="Digite sua profissão"
                        :invalid="!!errors.profession"
                        class="w-full"
                    />
                    <small v-if="errors.profession" class="form-error">{{
                        errors.profession
                    }}</small>
                </div>
            </div>

            <div class="form-actions">
                <Button
                    type="submit"
                    :label="isEditMode ? 'Atualizar Perfil' : 'Criar Perfil'"
                    icon="pi pi-save"
                    :loading="isSubmitting"
                    severity="info"
                    class="submit-button"
                />
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import InputText from 'primevue/inputtext'
import DatePicker from 'primevue/datepicker'
import Button from 'primevue/button'
import UserProfileService, { type UserProfile } from '@/services/UserProfileService'
import { useToast } from '@/composables/useToast'

const toast = useToast()
const isSubmitting = ref(false)
const isEditMode = ref(false)
const maxDate = ref(new Date())

// Data do DatePicker (objeto Date)
const birthDateValue = ref<Date | null>(null)

// Dados do formulário
const formData = reactive<UserProfile>({
    name: '',
    birthDate: '',
    address: '',
    profession: '',
})

// Erros de validação
const errors = reactive({
    name: '',
    birthDate: '',
    address: '',
    profession: '',
})

// Converte Date para string DD/MM/YYYY
function dateToString(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}

// Converte string DD/MM/YYYY para Date
function stringToDate(dateStr: string): Date | null {
    const parts = dateStr.split('/')
    if (parts.length !== 3 || !parts[0] || !parts[1] || !parts[2]) return null

    const day = parseInt(parts[0], 10)
    const month = parseInt(parts[1], 10) - 1
    const year = parseInt(parts[2], 10)

    return new Date(year, month, day)
}

// Watch para sincronizar DatePicker com formData
watch(birthDateValue, (newDate) => {
    if (newDate) {
        formData.birthDate = dateToString(newDate)
        errors.birthDate = ''
    }
})

// Valida o formulário
function validateForm(): boolean {
    let isValid = true

    // Limpa erros anteriores
    errors.name = ''
    errors.birthDate = ''
    errors.address = ''
    errors.profession = ''

    if (!formData.name.trim()) {
        errors.name = 'Nome é obrigatório'
        isValid = false
    }

    if (!formData.birthDate) {
        errors.birthDate = 'Data de nascimento é obrigatória'
        isValid = false
    }

    if (!formData.address.trim()) {
        errors.address = 'Endereço é obrigatório'
        isValid = false
    }

    if (!formData.profession.trim()) {
        errors.profession = 'Profissão é obrigatória'
        isValid = false
    }

    return isValid
}

// Carrega perfil existente
async function loadProfile() {
    try {
        const profile = await UserProfileService.getProfile()
        if (profile && profile.name) {
            isEditMode.value = true
            formData.name = profile.name
            formData.birthDate = profile.birthDate
            formData.address = profile.address
            formData.profession = profile.profession

            // Converte a data string para Date para o DatePicker
            const date = stringToDate(profile.birthDate)
            if (date) {
                birthDateValue.value = date
            }
        }
    } catch (error) {
        console.error('Erro ao carregar perfil:', error)
    }
}

// Submete o formulário
async function handleSubmit() {
    if (!validateForm()) {
        toast.showError('Por favor, preencha todos os campos obrigatórios')
        return
    }

    isSubmitting.value = true

    try {
        let response

        if (isEditMode.value) {
            response = await UserProfileService.updateProfile(formData)
        } else {
            response = await UserProfileService.createProfile(formData)
        }

        if (response.success) {
            toast.showSuccess(response.message || 'Perfil salvo com sucesso!')
            isEditMode.value = true
        } else {
            toast.showError(response.message || 'Erro ao salvar perfil')
        }
    } catch (error) {
        console.error('Erro ao salvar perfil:', error)
        toast.showError('Erro ao salvar perfil')
    } finally {
        isSubmitting.value = false
    }
}

onMounted(() => {
    loadProfile()
})
</script>

<style scoped>
.user-profile-form {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
}

.profile-form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
}

@media (min-width: 768px) {
    .form-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .form-field:first-child,
    .form-field:nth-child(3) {
        grid-column: 1 / -1;
    }
}

.form-field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-label {
    font-weight: 600;
    color: #1e293b;
    font-size: 0.875rem;
}

.form-error {
    color: #ef4444;
    font-size: 0.75rem;
    margin-top: 0.25rem;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
}

.submit-button {
    min-width: 180px;
}

:deep(.p-inputtext),
:deep(.p-datepicker) {
    width: 100%;
}

:deep(.p-inputtext:focus) {
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
}

:deep(.p-datepicker-input-icon-container) {
    right: 0.75rem;
}

.w-full {
    width: 100%;
}
</style>
