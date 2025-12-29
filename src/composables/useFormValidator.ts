/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue'

export interface ValidationRule {
    validate: (value: unknown) => boolean
    message: string
}

export interface FormField<T = string> {
    value: T
    error: string
    rules: ValidationRule[]
}

export function useFormValidator() {
    const createField = <T = string,>(rules: ValidationRule[] = [], initialValue: T = '' as T) => {
        return ref<FormField<T>>({
            value: initialValue,
            error: '',
            rules,
        })
    }

    const validateField = (field: FormField): boolean => {
        field.error = ''

        if (!field.value || (typeof field.value === 'string' && field.value.trim() === '')) {
            field.error = 'Campo obrigatório'
            return false
        }

        for (const rule of field.rules) {
            if (!rule.validate(field.value)) {
                field.error = rule.message
                return false
            }
        }

        return true
    }

    const validateForm = (fields: Record<string, any>): boolean => {
        let isValid = true

        for (const fieldRef of Object.values(fields)) {
            const field = fieldRef.value as FormField
            if (!validateField(field)) {
                isValid = false
            }
        }

        return isValid
    }

    const clearErrors = (fields: Record<string, any>) => {
        for (const fieldRef of Object.values(fields)) {
            const field = fieldRef.value as FormField
            field.error = ''
        }
    }

    // Common validation rules
    const validators = {
        email: {
            validate: (value: unknown) => {
                if (typeof value !== 'string' || !value.trim()) return true
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            },
            message: 'Email inválido',
        },
        minLength: (length: number) => ({
            validate: (value: unknown) => {
                if (typeof value !== 'string') return false
                return value.length >= length
            },
            message: `Mínimo de ${length} caracteres`,
        }),
        maxLength: (length: number) => ({
            validate: (value: unknown) => {
                if (typeof value !== 'string') return false
                return value.length <= length
            },
            message: `Máximo de ${length} caracteres`,
        }),
        required: {
            validate: (value: unknown) => typeof value === 'string' && value.trim() !== '',
            message: 'Campo obrigatório',
        },
        passwordStrength: {
            validate: (value: unknown) => {
                if (typeof value !== 'string') return false
                // Pelo menos 1 maiúscula, 1 minúscula, 1 número
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)
            },
            message: 'Mínimo 8 caracteres, com letra maiúscula, minúscula e número',
        },
    }

    return {
        createField,
        validateField,
        validateForm,
        clearErrors,
        validators,
    }
}
