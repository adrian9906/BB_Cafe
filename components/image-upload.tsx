"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, X, ImageIcon, Camera } from "lucide-react"
import Image from "next/image"
import { uploadImage } from "@/lib/actions"

interface ImageUploadProps {
    label: string
    value: string // Ahora será una URL, no base64
    onChange: (imageUrl: string) => void
    placeholder?: string
    maxSize?: number // en MB
    className?: string,
    path?: string
}

export function ImageUpload({
    label,
    value,
    onChange,
    placeholder = "Sube una imagen",
    maxSize = 5,
    className = "",
    path = "uploads",
}: ImageUploadProps) {
    const [isDragging, setIsDragging] = useState(false)
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [preview, setPreview] = useState("")
    const fileInputRef = useRef<HTMLInputElement>(null)

    const uploadImageToServer = async (file: File): Promise<string> => {
        const response = await uploadImage({ file }, path)

        if (!response) {
            throw new Error('Error al subir la imagen')
        }

        return response.url || ""
    }

    const handleFileSelect = async (file: File) => {
        setError("")
        setIsLoading(true)

        // Validar tipo de archivo
        if (!file.type.startsWith("image/")) {
            setError("Por favor selecciona un archivo de imagen válido")
            setIsLoading(false)
            return
        }

        // Validar tamaño
        if (file.size > maxSize * 1024 * 1024) {
            setError(`La imagen debe ser menor a ${maxSize}MB`)
            setIsLoading(false)
            return
        }

        try {
            // Crear preview local mientras se sube
            const reader = new FileReader()
            reader.onload = (e) => {
                setPreview(e.target?.result as string)
            }
            reader.readAsDataURL(file)

            // Subir imagen al servidor
            const imageUrl = await uploadImageToServer(file)

            // Guardar URL en el estado del formulario
            onChange(imageUrl)
            setIsLoading(false)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al procesar la imagen")
            setPreview("")
            setIsLoading(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)

        const files = Array.from(e.dataTransfer.files)
        if (files.length > 0) {
            handleFileSelect(files[0])
        }
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            handleFileSelect(files[0])
        }
    }

    const handleRemoveImage = () => {
        onChange("")
        setPreview("")
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const openFileDialog = () => {
        fileInputRef.current?.click()
    }

    // Usar preview si existe, sino usar value (URL del servidor)
    const displayImage = preview || value

    return (
        <div className={`space-y-3 ${className}`}>
            <Label>{label}</Label>

            {displayImage ? (
                // Vista previa de la imagen
                <div className="relative group">
                    <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                        <Image
                            src={displayImage}
                            alt="Vista previa"
                            fill
                            className="object-cover"
                            unoptimized={preview !== ""} // No optimizar preview local
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="secondary"
                                    onClick={openFileDialog}
                                    className="bg-white/90 text-black hover:bg-white"
                                    disabled={isLoading}
                                >
                                    <Camera className="h-4 w-4 mr-2" />
                                    Cambiar
                                </Button>
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="destructive"
                                    onClick={handleRemoveImage}
                                    className="bg-red-600/90 hover:bg-red-600"
                                    disabled={isLoading}
                                >
                                    <X className="h-4 w-4 mr-2" />
                                    Eliminar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // Área de subida
                <div
                    className={`
            relative w-full h-48 border-2 border-dashed rounded-lg transition-all duration-200 cursor-pointer
            ${isDragging
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                            : "border-gray-300 hover:border-gray-400 bg-gray-50 dark:bg-gray-900"
                        }
            ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
          `}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={!isLoading ? openFileDialog : undefined}
                >
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                        {isLoading ? (
                            <div className="flex flex-col items-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-3"></div>
                                <p className="text-sm text-muted-foreground">Subiendo imagen...</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-center w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full mb-3">
                                    {isDragging ? (
                                        <Upload className="h-6 w-6 text-blue-600" />
                                    ) : (
                                        <ImageIcon className="h-6 w-6 text-gray-500" />
                                    )}
                                </div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    {isDragging ? "Suelta la imagen aquí" : placeholder}
                                </p>
                                <p className="text-xs text-muted-foreground">Arrastra y suelta o haz clic para seleccionar</p>
                                <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP hasta {maxSize}MB</p>
                            </>
                        )}
                    </div>
                </div>
            )}

            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInputChange} className="hidden" />
        </div>
    )
}

