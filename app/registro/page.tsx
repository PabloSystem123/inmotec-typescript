"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  User,
  Mail,
  Phone,
  Lock,
  ArrowRight,
  Building2,
  UserPlus,
} from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function RegistroPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState("cliente")
  const router = useRouter()

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
    terminos: false,
  })

  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    number: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    if (name === "password") {
      setPasswordStrength({
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        number: /[0-9]/.test(value),
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  const isPasswordValid = Object.values(passwordStrength).every(Boolean)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo y header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00457B] rounded-2xl mb-4">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Crear cuenta</h1>
          <p className="text-gray-600">Únete a Matriz Inmobiliaria y comienza hoy</p>
        </div>

        {/* Formulario */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <div className="text-center">
              <Image src="/matriz-logo.png" alt="Matriz Inmobiliaria" width={140} height={45} className="mx-auto" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Tabs para tipo de usuario */}
            <Tabs defaultValue="cliente" className="w-full" onValueChange={(value) => setUserType(value)}>
              <TabsList className="grid w-full grid-cols-2 h-12 rounded-xl p-1 bg-gray-100">
                <TabsTrigger
                  value="cliente"
                  className="rounded-lg data-[state=active]:bg-[#00457B] data-[state=active]:text-white font-medium transition-all"
                >
                  👤 Cliente
                </TabsTrigger>
                <TabsTrigger
                  value="agente"
                  className="rounded-lg data-[state=active]:bg-[#00457B] data-[state=active]:text-white font-medium transition-all"
                >
                  🏢 Agente
                </TabsTrigger>
              </TabsList>

              <TabsContent value="cliente" className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre" className="text-gray-700 font-medium">
                        Nombre completo
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="nombre"
                          name="nombre"
                          placeholder="Tu nombre completo"
                          className="h-12 pl-11 rounded-xl border-2 border-gray-200 focus:border-[#00457B] focus:ring-0 transition-colors bg-white"
                          value={formData.nombre}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 font-medium">
                        Correo electrónico
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="tu@email.com"
                          className="h-12 pl-11 rounded-xl border-2 border-gray-200 focus:border-[#00457B] focus:ring-0 transition-colors bg-white"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telefono" className="text-gray-700 font-medium">
                        Teléfono
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="telefono"
                          name="telefono"
                          type="tel"
                          placeholder="Tu número de teléfono"
                          className="h-12 pl-11 rounded-xl border-2 border-gray-200 focus:border-[#00457B] focus:ring-0 transition-colors bg-white"
                          value={formData.telefono}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-gray-700 font-medium">
                        Contraseña
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="h-12 pl-11 pr-11 rounded-xl border-2 border-gray-200 focus:border-[#00457B] focus:ring-0 transition-colors bg-white"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Validación de contraseña */}
                    {formData.password && (
                      <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                        <p className="text-sm font-medium text-gray-700 mb-3">Requisitos de contraseña:</p>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            {passwordStrength.length ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500 mr-2" />
                            )}
                            <span className="text-gray-600">Mínimo 8 caracteres</span>
                          </div>
                          <div className="flex items-center text-sm">
                            {passwordStrength.uppercase ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500 mr-2" />
                            )}
                            <span className="text-gray-600">Una letra mayúscula</span>
                          </div>
                          <div className="flex items-center text-sm">
                            {passwordStrength.number ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500 mr-2" />
                            )}
                            <span className="text-gray-600">Un número</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                        Confirmar contraseña
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="h-12 pl-11 pr-11 rounded-xl border-2 border-gray-200 focus:border-[#00457B] focus:ring-0 transition-colors bg-white"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {formData.password &&
                        formData.confirmPassword &&
                        formData.password !== formData.confirmPassword && (
                          <p className="text-red-500 text-sm flex items-center">
                            <XCircle className="h-4 w-4 mr-1" />
                            Las contraseñas no coinciden
                          </p>
                        )}
                      {formData.password &&
                        formData.confirmPassword &&
                        formData.password === formData.confirmPassword && (
                          <p className="text-green-500 text-sm flex items-center">
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Las contraseñas coinciden
                          </p>
                        )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <Checkbox
                      id="terminos"
                      name="terminos"
                      checked={formData.terminos}
                      onCheckedChange={(checked) => setFormData({ ...formData, terminos: checked as boolean })}
                      className="h-4 w-4 mt-0.5 border-2 border-gray-300 text-[#00457B] rounded"
                      required
                    />
                    <Label htmlFor="terminos" className="text-gray-700 text-sm leading-relaxed">
                      Acepto los{" "}
                      <Link href="/terminos" className="text-[#00457B] hover:underline font-medium">
                        términos y condiciones
                      </Link>{" "}
                      y la{" "}
                      <Link href="/privacidad" className="text-[#00457B] hover:underline font-medium">
                        política de privacidad
                      </Link>
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-[#00457B] hover:bg-[#003b69] rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 group"
                    disabled={
                      isLoading ||
                      !formData.terminos ||
                      formData.password !== formData.confirmPassword ||
                      !isPasswordValid
                    }
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Creando cuenta...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        Crear cuenta gratis
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="agente" className="mt-6">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center">
                    <Building2 className="h-5 w-5 text-yellow-600 mr-2" />
                    <span className="text-sm font-semibold text-yellow-800">
                      Registro como Agente Inmobiliario - Acceso Premium
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Mismos campos que cliente con IDs diferentes */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre-agente" className="text-gray-700 font-medium">
                        Nombre completo
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="nombre-agente"
                          name="nombre"
                          placeholder="Tu nombre completo"
                          className="h-12 pl-11 rounded-xl border-2 border-gray-200 focus:border-[#00457B] focus:ring-0 transition-colors bg-white"
                          value={formData.nombre}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email-agente" className="text-gray-700 font-medium">
                        Correo electrónico
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="email-agente"
                          name="email"
                          type="email"
                          placeholder="tu@email.com"
                          className="h-12 pl-11 rounded-xl border-2 border-gray-200 focus:border-[#00457B] focus:ring-0 transition-colors bg-white"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telefono-agente" className="text-gray-700 font-medium">
                        Teléfono
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="telefono-agente"
                          name="telefono"
                          type="tel"
                          placeholder="Tu número de teléfono"
                          className="h-12 pl-11 rounded-xl border-2 border-gray-200 focus:border-[#00457B] focus:ring-0 transition-colors bg-white"
                          value={formData.telefono}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password-agente" className="text-gray-700 font-medium">
                        Contraseña
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="password-agente"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="h-12 pl-11 pr-11 rounded-xl border-2 border-gray-200 focus:border-[#00457B] focus:ring-0 transition-colors bg-white"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    {formData.password && (
                      <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                        <p className="text-sm font-medium text-gray-700 mb-3">Requisitos de contraseña:</p>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            {passwordStrength.length ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500 mr-2" />
                            )}
                            <span className="text-gray-600">Mínimo 8 caracteres</span>
                          </div>
                          <div className="flex items-center text-sm">
                            {passwordStrength.uppercase ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500 mr-2" />
                            )}
                            <span className="text-gray-600">Una letra mayúscula</span>
                          </div>
                          <div className="flex items-center text-sm">
                            {passwordStrength.number ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500 mr-2" />
                            )}
                            <span className="text-gray-600">Un número</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword-agente" className="text-gray-700 font-medium">
                        Confirmar contraseña
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="confirmPassword-agente"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="h-12 pl-11 pr-11 rounded-xl border-2 border-gray-200 focus:border-[#00457B] focus:ring-0 transition-colors bg-white"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {formData.password &&
                        formData.confirmPassword &&
                        formData.password !== formData.confirmPassword && (
                          <p className="text-red-500 text-sm flex items-center">
                            <XCircle className="h-4 w-4 mr-1" />
                            Las contraseñas no coinciden
                          </p>
                        )}
                      {formData.password &&
                        formData.confirmPassword &&
                        formData.password === formData.confirmPassword && (
                          <p className="text-green-500 text-sm flex items-center">
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Las contraseñas coinciden
                          </p>
                        )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <Checkbox
                      id="terminos-agente"
                      name="terminos"
                      checked={formData.terminos}
                      onCheckedChange={(checked) => setFormData({ ...formData, terminos: checked as boolean })}
                      className="h-4 w-4 mt-0.5 border-2 border-gray-300 text-[#00457B] rounded"
                      required
                    />
                    <Label htmlFor="terminos-agente" className="text-gray-700 text-sm leading-relaxed">
                      Acepto los{" "}
                      <Link href="/terminos" className="text-[#00457B] hover:underline font-medium">
                        términos y condiciones
                      </Link>{" "}
                      y la{" "}
                      <Link href="/privacidad" className="text-[#00457B] hover:underline font-medium">
                        política de privacidad
                      </Link>
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-[#00457B] hover:bg-[#003b69] rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 group"
                    disabled={
                      isLoading ||
                      !formData.terminos ||
                      formData.password !== formData.confirmPassword ||
                      !isPasswordValid
                    }
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Creando cuenta...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        Crear cuenta de agente
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500 font-medium">O regístrate con</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                <div className="w-5 h-5 bg-red-500 rounded mr-2"></div>
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                <div className="w-5 h-5 bg-blue-600 rounded mr-2"></div>
                Facebook
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 space-y-4">
          <p className="text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="text-[#00457B] font-semibold hover:underline">
              Inicia sesión
            </Link>
          </p>
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
            <Link href="/terminos" className="hover:text-gray-700">
              Términos
            </Link>
            <span>•</span>
            <Link href="/privacidad" className="hover:text-gray-700">
              Privacidad
            </Link>
            <span>•</span>
            <Link href="/soporte" className="hover:text-gray-700">
              Soporte
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
