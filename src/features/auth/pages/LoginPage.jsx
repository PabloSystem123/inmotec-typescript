import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Checkbox } from "@/shared/components/ui/checkbox"
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card"
import { Alert, AlertDescription } from "@/shared/components/ui/alert"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Building2, AlertCircle } from "lucide-react"
import { useToast } from "@/shared/hooks/use-toast"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const { toast } = useToast()

  const validateForm = () => {
    const newErrors = {}

    if (!email) {
      newErrors.email = "El correo electrónico es requerido"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "El correo electrónico no es válido"
    }

    if (!password) {
      newErrors.password = "La contraseña es requerida"
    } else if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Error en el formulario",
        description: "Por favor corrige los errores antes de continuar.",
      })
      return
    }

    setIsLoading(true)
    setErrors({})

    // Simulación de autenticación
    setTimeout(() => {
      // Simulamos un error ocasional para mostrar el manejo de errores
      if (email === "error@test.com") {
        setErrors({ general: "Credenciales incorrectas. Verifica tu email y contraseña." })
        setIsLoading(false)
        toast({
          variant: "destructive",
          title: "Error de autenticación",
          description: "Las credenciales proporcionadas no son válidas.",
        })
        return
      }

      setIsLoading(false)
      toast({
        title: "¡Bienvenido!",
        description: "Has iniciado sesión correctamente.",
      })
      navigate("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo y header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
            <Building2 className="h-8 w-8 text-[#00457B]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Bienvenido de vuelta</h1>
          <p className="text-gray-600">Ingresa a tu cuenta de Matriz Inmobiliaria</p>
        </div>

        {/* Formulario */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <div className="text-center bg-white rounded-lg p-3">
              <img src="/matriz-logo.png" alt="Matriz Inmobiliaria" width={140} height={45} className="mx-auto" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Error general */}
            {errors.general && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.general}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Correo electrónico
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      className={`h-12 pl-11 rounded-xl border-2 transition-colors bg-white ${
                        errors.email ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#00457B]"
                      } focus:ring-0`}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (errors.email) {
                          setErrors({ ...errors, email: undefined })
                        }
                      }}
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-gray-700 font-medium">
                      Contraseña
                    </Label>
                    <Link to="/recuperar-password" className="text-sm text-[#00457B] hover:underline font-medium">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`h-12 pl-11 pr-11 rounded-xl border-2 transition-colors bg-white ${
                        errors.password
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-[#00457B]"
                      } focus:ring-0`}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        if (errors.password) {
                          setErrors({ ...errors, password: undefined })
                        }
                      }}
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
                  {errors.password && (
                    <p className="text-red-500 text-sm flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked)}
                    className="h-4 w-4 border-2 border-gray-300 text-[#00457B] rounded"
                  />
                  <Label htmlFor="remember" className="text-gray-600 font-medium">
                    Recordar sesión
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-[#00457B] hover:bg-[#003b69] rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 group disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Iniciando sesión...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Iniciar Sesión
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>

              {/* Demo credentials */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800 font-medium mb-1">Credenciales de prueba:</p>
                <p className="text-xs text-blue-700">Email: demo@matriz.com</p>
                <p className="text-xs text-blue-700">Contraseña: cualquier cosa</p>
                <p className="text-xs text-red-700 mt-1">Para probar error: error@test.com</p>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-gray-500 font-medium">O continúa con</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
                  onClick={() =>
                    toast({ title: "Próximamente", description: "Login con Google estará disponible pronto." })
                  }
                >
                  <div className="w-5 h-5 bg-red-500 rounded mr-2"></div>
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
                  onClick={() =>
                    toast({ title: "Próximamente", description: "Login con Facebook estará disponible pronto." })
                  }
                >
                  <div className="w-5 h-5 bg-blue-600 rounded mr-2"></div>
                  Facebook
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 space-y-4">
          <p className="text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link to="/registro" className="text-[#00457B] font-semibold hover:underline">
              Regístrate gratis
            </Link>
          </p>
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
            <Link to="/terminos" className="hover:text-gray-700">
              Términos
            </Link>
            <span>•</span>
            <Link to="/privacidad" className="hover:text-gray-700">
              Privacidad
            </Link>
            <span>•</span>
            <Link to="/soporte" className="hover:text-gray-700">
              Soporte
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}