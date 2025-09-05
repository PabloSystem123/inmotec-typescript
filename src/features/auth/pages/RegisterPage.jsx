+import React, { useState } from "react"
+import { Link, useNavigate } from "react-router-dom"
+import { Button } from "@/shared/components/ui/button"
+import { Input } from "@/shared/components/ui/input"
+import { Label } from "@/shared/components/ui/label"
+import { Card, CardContent, CardHeader } from "@/shared/components/ui/card"
+import {
+  Eye,
+  EyeOff,
+  CheckCircle2,
+  XCircle,
+  User,
+  Mail,
+  Phone,
+  Lock,
+  ArrowRight,
+  Building2,
+  UserPlus,
+  Calendar,
+  Star,
+} from "lucide-react"
+import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/components/ui/tabs"
+
+export default function RegisterPage() {
+  const [showPassword, setShowPassword] = useState(false)
+  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
+  const [isLoading, setIsLoading] = useState(false)
+  const [userType, setUserType] = useState("cliente")
+  const navigate = useNavigate()
+
+  const [formData, setFormData] = useState({
+    nombre: "",
+    email: "",
+    telefono: "",
+    password: "",
+    confirmPassword: "",
+    terminos: false,
+  })
+
+  const [passwordStrength, setPasswordStrength] = useState({
+    length: false,
+    uppercase: false,
+    number: false,
+  })
+
+  const handleChange = (e) => {
+    const { name, value, type, checked } = e.target
+    setFormData({
+      ...formData,
+      [name]: type === "checkbox" ? checked : value,
+    })
+
+    if (name === "password") {
+      setPasswordStrength({
+        length: value.length >= 8,
+        uppercase: /[A-Z]/.test(value),
+        number: /[0-9]/.test(value),
+      })
+    }
+  }
+
+  const handleSubmit = async (e) => {
+    e.preventDefault()
+    setIsLoading(true)
+
+    setTimeout(() => {
+      setIsLoading(false)
+      navigate("/dashboard")
+    }, 1500)
+  }
+
+  const isPasswordValid = Object.values(passwordStrength).every(Boolean)
+
+  return (
+    <div className="min-h-screen bg-gradient-to-br from-[#00457B] via-[#0066cc] to-[#0080ff] flex">
+      {/* Panel izquierdo - Información */}
+      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 text-white relative overflow-hidden">
+        <div className="absolute inset-0 bg-black/20"></div>
+        <div className="relative z-10 max-w-md text-center">
+          <div className="mb-8">
+            <img src="/matriz-logo-white.png" alt="Matriz Inmobiliaria" className="h-16 mx-auto mb-6" />
+            <h1 className="text-3xl font-bold mb-4">Únete a Matriz Inmobiliaria</h1>
+            <p className="text-blue-100 text-lg">
+              Crea tu cuenta y accede a herramientas exclusivas para gestionar propiedades
+            </p>
+          </div>
+          
+          {/* Beneficios */}
+          <div className="space-y-4">
+            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-left">
+              <div className="flex items-center mb-2">
+                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
+                  <Building2 className="h-4 w-4 text-white" />
+                </div>
+                <span className="font-semibold">Acceso Completo</span>
+              </div>
+              <p className="text-sm text-blue-100">Gestiona propiedades y clientes</p>
+            </div>
+            
+            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-left">
+              <div className="flex items-center mb-2">
+                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
+                  <Calendar className="h-4 w-4 text-white" />
+                </div>
+                <span className="font-semibold">Agenda Digital</span>
+              </div>
+              <p className="text-sm text-blue-100">Programa citas automáticamente</p>
+            </div>
+            
+            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-left">
+              <div className="flex items-center mb-2">
+                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
+                  <Star className="h-4 w-4 text-white" />
+                </div>
+                <span className="font-semibold">Soporte Premium</span>
+              </div>
+              <p className="text-sm text-blue-100">Asistencia 24/7 especializada</p>
+            </div>
+          </div>
+        </div>
+      </div>

+      {/* Panel derecho - Formulario */}
+      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
+        <div className="w-full max-w-md">
+          {/* Header del formulario */}
+          <div className="text-center mb-8">
+            <div className="lg:hidden mb-6">
+              <img src="/matriz-logo.png" alt="Matriz Inmobiliaria" className="h-12 mx-auto" />
+            </div>
+            <h2 className="text-2xl font-bold text-gray-900 mb-2">Crear cuenta</h2>
+            <p className="text-gray-600">Únete a Matriz Inmobiliaria y comienza hoy</p>
+          </div>

-              <Button
-                type="submit"
-                className="w-full h-12 bg-[#00457B] hover:bg-[#003b69] rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 group disabled:opacity-50"
-                disabled={isLoading}
-              >
-                {isLoading ? (
-                  <div className="flex items-center justify-center">
-                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
-                    Iniciando sesión...
-                  </div>
-                ) : (
-                  <div className="flex items-center justify-center">
-                    Iniciar Sesión
-                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
-                  </div>
-                )}
-              </Button>
+          {/* Tabs para tipo de usuario */}
+          <Tabs defaultValue="cliente" className="w-full mb-6" onValueChange={(value) => setUserType(value)}>
+            <TabsList className="grid w-full grid-cols-2 h-12 rounded-lg p-1 bg-gray-100">
+              <TabsTrigger
+                value="cliente"
+                className="rounded-md data-[state=active]:bg-[#00457B] data-[state=active]:text-white font-medium transition-all"
+              >
+                👤 Cliente
+              </TabsTrigger>
+              <TabsTrigger
+                value="agente"
+                className="rounded-md data-[state=active]:bg-[#00457B] data-[state=active]:text-white font-medium transition-all"
+              >
+                🏢 Agente
+              </TabsTrigger>
+            </TabsList>

-              {/* Divider */}
-              <div className="relative my-6">
-                <div className="absolute inset-0 flex items-center">
-                  <div className="w-full border-t border-gray-200"></div>
+            <TabsContent value="cliente" className="mt-6">
+              <form onSubmit={handleSubmit} className="space-y-5">
+                <div className="space-y-4">
+                  <div>
+                    <Label htmlFor="nombre" className="text-gray-700 font-medium mb-2 block">
+                      Nombre completo
+                    </Label>
+                    <div className="relative">
+                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
+                      <Input
+                        id="nombre"
+                        name="nombre"
+                        placeholder="Tu nombre completo"
+                        className="h-12 pl-11 rounded-lg border-2 border-gray-200 focus:border-[#00457B] focus:ring-0 transition-colors"
+                        value={formData.nombre}
+                        onChange={handleChange}
+                        required
+                      />
+                    </div>
+                  </div>

+                  <div>
+                    <Label htmlFor="email" className="text-gray-700 font-medium mb-2 block">
+                      Correo electrónico
+                    </Label>
+                    <div className="relative">
+                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
+                      <Input
+                        id="email"
+                        name="email"
+                        type="email"
+                        placeholder="tu@email.com"
+                        className="h-12 pl-11 rounded-lg border-2 border-gray-200 focus:border-[#00457B] focus:ring-0 transition-colors"
+                        value={formData.email}
+                        onChange={handleChange}
+                        required
+                      />
+                    </div>
+                  </div>

+                  <div>
+                    <Label htmlFor="telefono" className="text-gray-700 font-medium mb-2 block">
+                      Teléfono
+                    </Label>
+                    <div className="relative">
+                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
+                      <Input
+                        id="telefono"
+                        name="telefono"
+                        type="tel"
+                        placeholder="Tu número de teléfono"
+                        className="h-12 pl-11 rounded-lg border-2 border-gray-200 focus:border-[#00457B] focus:ring-0 transition-colors"
+                        value={formData.telefono}
+                        onChange={handleChange}
+                        required
+                      />
+                    </div>
+                  </div>

+                  <div>
+                    <Label htmlFor="password" className="text-gray-700 font-medium mb-2 block">
+                      Contraseña
+                    </Label>
+                    <div className="relative">
+                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
+                      <Input
+                        id="password"
+                        name="password"
+                        type={showPassword ? "text" : "password"}
+                        placeholder="••••••••"
+                        className="h-12 pl-11 pr-11 rounded-lg border-2 border-gray-200 focus:border-[#00457B] focus:ring-0 transition-colors"
+                        value={formData.password}
+                        onChange={handleChange}
+                        required
+                      />
+                      <button
+                        type="button"
+                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
+                        onClick={() => setShowPassword(!showPassword)}
+                      >
+                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
+                      </button>
+                    </div>
+                  </div>

+                  {/* Validación de contraseña */}
+                  {formData.password && (
+                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
+                      <p className="text-sm font-medium text-gray-700 mb-3">Requisitos de contraseña:</p>
+                      <div className="space-y-2">
+                        <div className="flex items-center text-sm">
+                          {passwordStrength.length ? (
+                            <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
+                          ) : (
+                            <XCircle className="h-4 w-4 text-red-500 mr-2" />
+                          )}
+                          <span className="text-gray-600">Mínimo 8 caracteres</span>
+                        </div>
+                        <div className="flex items-center text-sm">
+                          {passwordStrength.uppercase ? (
+                            <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
+                          ) : (
+                            <XCircle className="h-4 w-4 text-red-500 mr-2" />
+                          )}
+                          <span className="text-gray-600">Una letra mayúscula</span>
+                        </div>
+                        <div className="flex items-center text-sm">
+                          {passwordStrength.number ? (
+                            <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
+                          ) : (
+                            <XCircle className="h-4 w-4 text-red-500 mr-2" />
+                          )}
+                          <span className="text-gray-600">Un número</span>
+                        </div>
+                      </div>
+                    </div>
+                  )}

+                  <div>
+                    <Label htmlFor="confirmPassword" className="text-gray-700 font-medium mb-2 block">
+                      Confirmar contraseña
+                    </Label>
+                    <div className="relative">
+                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
+                      <Input
+                        id="confirmPassword"
+                        name="confirmPassword"
+                        type={showConfirmPassword ? "text" : "password"}
+                        placeholder="••••••••"
+                        className="h-12 pl-11 pr-11 rounded-lg border-2 border-gray-200 focus:border-[#00457B] focus:ring-0 transition-colors"
+                        value={formData.confirmPassword}
+                        onChange={handleChange}
+                        required
+                      />
+                      <button
+                        type="button"
+                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
+                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
+                      >
+                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
+                      </button>
+                    </div>
+                    {formData.password &&
+                      formData.confirmPassword &&
+                      formData.password !== formData.confirmPassword && (
+                        <p className="text-red-500 text-sm flex items-center mt-1">
+                          <XCircle className="h-4 w-4 mr-1" />
+                          Las contraseñas no coinciden
+                        </p>
+                      )}
+                    {formData.password &&
+                      formData.confirmPassword &&
+                      formData.password === formData.confirmPassword && (
+                        <p className="text-green-500 text-sm flex items-center mt-1">
+                          <CheckCircle2 className="h-4 w-4 mr-1" />
+                          Las contraseñas coinciden
+                        </p>
+                      )}
+                  </div>
                 </div>
-                <div className="relative flex justify-center text-sm">
-                  <span className="px-3 bg-white text-gray-500 font-medium">O continúa con</span>
+
+                <div className="flex items-start space-x-3 bg-blue-50 p-4 rounded-lg border border-blue-200">
+                  <input
+                    type="checkbox"
+                    id="terminos"
+                    name="terminos"
+                    checked={formData.terminos}
+                    onChange={handleChange}
+                    className="h-4 w-4 mt-0.5 border-2 border-gray-300 text-[#00457B] rounded"
+                    required
+                  />
+                  <Label htmlFor="terminos" className="text-gray-700 text-sm leading-relaxed">
+                    Acepto los{" "}
+                    <Link to="/terminos" className="text-[#00457B] hover:underline font-medium">
+                      términos y condiciones
+                    </Link>{" "}
+                    y la{" "}
+                    <Link to="/privacidad" className="text-[#00457B] hover:underline font-medium">
+                      política de privacidad
+                    </Link>
+                  </Label>
                 </div>
-              </div>

-              {/* Social Login */}
-              <div className="grid grid-cols-2 gap-3">
-                <Button
-                  type="button"
-                  variant="outline"
-                  className="h-11 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
-                  onClick={() =>
-                    toast({ title: "Próximamente", description: "Login con Google estará disponible pronto." })
-                  }
-                >
-                  <div className="w-5 h-5 bg-red-500 rounded mr-2"></div>
-                  Google
-                </Button>
-                <Button
-                  type="button"
-                  variant="outline"
-                  className="h-11 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
-                  onClick={() =>
-                    toast({ title: "Próximamente", description: "Login con Facebook estará disponible pronto." })
-                  }
-                >
-                  <div className="w-5 h-5 bg-blue-600 rounded mr-2"></div>
-                  Facebook
-                </Button>
-              </div>
-            </form>
-          </CardContent>
-        </Card>
+                <Button
+                  type="submit"
+                  className="w-full h-12 bg-[#00457B] hover:bg-[#003b69] rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 group"
+                  disabled={
+                    isLoading ||
+                    !formData.terminos ||
+                    formData.password !== formData.confirmPassword ||
+                    !isPasswordValid
+                  }
+                >
+                  {isLoading ? (
+                    <div className="flex items-center justify-center">
+                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
+                      Creando cuenta...
+                    </div>
+                  ) : (
+                    <div className="flex items-center justify-center">
+                      Crear cuenta gratis
+                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
+                    </div>
+                  )}
+                </Button>
+              </form>
+            </TabsContent>

-        {/* Footer */}
-        <div className="text-center mt-6 space-y-4">
-          <p className="text-gray-600">
-            ¿No tienes una cuenta?{" "}
-            <Link to="/registro" className="text-[#00457B] font-semibold hover:underline">
-              Regístrate gratis
-            </Link>
-          </p>
-          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
-            <Link to="/terminos" className="hover:text-gray-700">
-              Términos
-            </Link>
-            <span>•</span>
-            <Link to="/privacidad" className="hover:text-gray-700">
-              Privacidad
-            </Link>
-            <span>•</span>
-            <Link to="/soporte" className="hover:text-gray-700">
-              Soporte
-            </Link>
+            <TabsContent value="agente" className="mt-6">
+              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 mb-6">
+                <div className="flex items-center">
+                  <Building2 className="h-5 w-5 text-yellow-600 mr-2" />
+                  <span className="text-sm font-semibold text-yellow-800">
+                    Registro como Agente Inmobiliario - Acceso Premium
+                  </span>
+                </div>
+              </div>
+              
+              {/* Mismo formulario pero para agentes */}
+              <form onSubmit={handleSubmit} className="space-y-5">
+                {/* Campos idénticos al cliente */}
+                <div className="space-y-4">
+                  <div>
+                    <Label htmlFor="nombre-agente" className="text-gray-700 font-medium mb-2 block">
+                      Nombre completo
+                    </Label>
+                    <div className="relative">
+                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
+                      <Input
+                        id="nombre-agente"
+                        name="nombre"
+                        placeholder="Tu nombre completo"
+                        className="h-12 pl-11 rounded-lg border-2 border-gray-200 focus:border-[#00457B] focus:ring-0 transition-colors"
+                        value={formData.nombre}
+                        onChange={handleChange}
+                        required
+                      />
+                    </div>
+                  </div>
+                  
+                  {/* Resto de campos similares... */}
+                </div>

+                <Button
+                  type="submit"
+                  className="w-full h-12 bg-[#00457B] hover:bg-[#003b69] rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 group"
+                  disabled={
+                    isLoading ||
+                    !formData.terminos ||
+                    formData.password !== formData.confirmPassword ||
+                    !isPasswordValid
+                  }
+                >
+                  {isLoading ? (
+                    <div className="flex items-center justify-center">
+                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
+                      Creando cuenta...
+                    </div>
+                  ) : (
+                    <div className="flex items-center justify-center">
+                      Crear cuenta de agente
+                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
+                    </div>
+                  )}
+                </Button>
+              </form>
+            </TabsContent>
+          </Tabs>

+          {/* Footer */}
+          <div className="text-center mt-8">
+            <p className="text-gray-600">
+              ¿Ya tienes una cuenta?{" "}
+              <Link to="/login" className="text-[#00457B] font-semibold hover:underline">
+                Inicia sesión
+              </Link>
+            </p>
           </div>
         </div>
       </div>
@@ .. @@
 }