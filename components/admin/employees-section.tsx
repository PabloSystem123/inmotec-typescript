"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Plus, Search, Edit, Eye, Trash2, User, Mail, Phone, FileText, Users } from "lucide-react"

interface Employee {
  id: number
  document: string
  firstName: string
  lastName: string
  email: string
  phone: string
  status: "active" | "inactive"
}

export function EmployeesSection() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      document: "12345678",
      firstName: "Ana",
      lastName: "Rodríguez",
      email: "ana.rodriguez@matriz.com",
      phone: "+57 300 123 4567",
      status: "active",
    },
    {
      id: 2,
      document: "87654321",
      firstName: "Carlos",
      lastName: "Martínez",
      email: "carlos.martinez@matriz.com",
      phone: "+57 301 234 5678",
      status: "active",
    },
    {
      id: 3,
      document: "11223344",
      firstName: "María",
      lastName: "González",
      email: "maria.gonzalez@matriz.com",
      phone: "+57 302 345 6789",
      status: "inactive",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [formData, setFormData] = useState({
    document: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleStatusChange = (employeeId: number, newStatus: "active" | "inactive") => {
    setEmployees(
      employees.map((employee) => (employee.id === employeeId ? { ...employee, status: newStatus } : employee)),
    )
  }

  const handleCreateEmployee = () => {
    const newEmployee: Employee = {
      id: employees.length + 1,
      document: formData.document,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      status: "active",
    }
    setEmployees([...employees, newEmployee])
    setIsCreateModalOpen(false)
    resetForm()
  }

  const handleEditEmployee = () => {
    if (selectedEmployee) {
      setEmployees(
        employees.map((employee) =>
          employee.id === selectedEmployee.id
            ? {
                ...employee,
                document: formData.document,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
              }
            : employee,
        ),
      )
      setIsEditModalOpen(false)
      resetForm()
    }
  }

  const handleDeleteEmployee = (employeeId: number) => {
    setEmployees(employees.filter((employee) => employee.id !== employeeId))
  }

  const resetForm = () => {
    setFormData({
      document: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    })
    setSelectedEmployee(null)
  }

  const openEditModal = (employee: Employee) => {
    setSelectedEmployee(employee)
    setFormData({
      document: employee.document,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
    })
    setIsEditModalOpen(true)
  }

  const openViewModal = (employee: Employee) => {
    setSelectedEmployee(employee)
    setIsViewModalOpen(true)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Empleados</h2>
          <p className="text-gray-600">Administra la información de los empleados</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#00457B] to-[#0066cc] hover:from-[#003b69] hover:to-[#0052a3] shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              Crear Empleado
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#00457B] flex items-center">
                <Users className="h-6 w-6 mr-2" />
                Crear Nuevo Empleado
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Ingresa la información del nuevo empleado.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                <Label htmlFor="document" className="flex items-center text-sm font-semibold text-[#00457B] mb-2">
                  <FileText className="h-4 w-4 mr-2" />
                  Documento
                </Label>
                <Input
                  id="document"
                  value={formData.document}
                  onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                  placeholder="Número de documento"
                  className="border-blue-300 focus:border-[#00457B]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                  <Label htmlFor="firstName" className="flex items-center text-sm font-semibold text-green-700 mb-2">
                    <User className="h-4 w-4 mr-2" />
                    Nombre
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Nombre"
                    className="border-green-300 focus:border-green-600"
                  />
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                  <Label htmlFor="lastName" className="flex items-center text-sm font-semibold text-green-700 mb-2">
                    <User className="h-4 w-4 mr-2" />
                    Apellido
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Apellido"
                    className="border-green-300 focus:border-green-600"
                  />
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-200">
                <Label htmlFor="email" className="flex items-center text-sm font-semibold text-purple-700 mb-2">
                  <Mail className="h-4 w-4 mr-2" />
                  Correo Electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="correo@ejemplo.com"
                  className="border-purple-300 focus:border-purple-600"
                />
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-200">
                <Label htmlFor="phone" className="flex items-center text-sm font-semibold text-orange-700 mb-2">
                  <Phone className="h-4 w-4 mr-2" />
                  Número de Teléfono
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+57 300 123 4567"
                  className="border-orange-300 focus:border-orange-600"
                />
              </div>
            </div>
            <DialogFooter className="bg-gray-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)} className="mr-2">
                Cancelar
              </Button>
              <Button
                onClick={handleCreateEmployee}
                className="bg-gradient-to-r from-[#00457B] to-[#0066cc] hover:from-[#003b69] hover:to-[#0052a3]"
              >
                Crear Empleado
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="bg-gradient-to-r from-[#00457B] to-[#0066cc] text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">Lista de Empleados</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
              <Input
                placeholder="Buscar empleados..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-bold text-gray-700">ID</TableHead>
                <TableHead className="font-bold text-gray-700">Nombre</TableHead>
                <TableHead className="font-bold text-gray-700">Apellido</TableHead>
                <TableHead className="font-bold text-gray-700">Correo</TableHead>
                <TableHead className="font-bold text-gray-700">Número</TableHead>
                <TableHead className="font-bold text-gray-700">Estado</TableHead>
                <TableHead className="font-bold text-gray-700">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id} className="hover:bg-blue-50 transition-colors">
                  <TableCell className="font-medium">{employee.id}</TableCell>
                  <TableCell className="font-semibold text-[#00457B]">{employee.firstName}</TableCell>
                  <TableCell className="font-semibold text-[#00457B]">{employee.lastName}</TableCell>
                  <TableCell className="text-gray-600">{employee.email}</TableCell>
                  <TableCell className="text-gray-600">{employee.phone}</TableCell>
                  <TableCell>
                    <Select
                      value={employee.status}
                      onValueChange={(value: "active" | "inactive") => handleStatusChange(employee.id, value)}
                    >
                      <SelectTrigger className="w-36 border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                            <span className="font-medium">Activo</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="inactive">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                            <span className="font-medium">Inactivo</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openViewModal(employee)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditModal(employee)}
                        className="text-green-600 hover:text-green-800 hover:bg-green-50"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. Esto eliminará permanentemente al empleado "
                              {employee.firstName} {employee.lastName}" del sistema.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteEmployee(employee.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#00457B] flex items-center">
              <Edit className="h-6 w-6 mr-2" />
              Editar Empleado
            </DialogTitle>
            <DialogDescription className="text-gray-600">Modifica la información del empleado.</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
              <Label htmlFor="editDocument" className="flex items-center text-sm font-semibold text-[#00457B] mb-2">
                <FileText className="h-4 w-4 mr-2" />
                Documento
              </Label>
              <Input
                id="editDocument"
                value={formData.document}
                onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                placeholder="Número de documento"
                className="border-blue-300 focus:border-[#00457B]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                <Label htmlFor="editFirstName" className="flex items-center text-sm font-semibold text-green-700 mb-2">
                  <User className="h-4 w-4 mr-2" />
                  Nombre
                </Label>
                <Input
                  id="editFirstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="Nombre"
                  className="border-green-300 focus:border-green-600"
                />
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                <Label htmlFor="editLastName" className="flex items-center text-sm font-semibold text-green-700 mb-2">
                  <User className="h-4 w-4 mr-2" />
                  Apellido
                </Label>
                <Input
                  id="editLastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Apellido"
                  className="border-green-300 focus:border-green-600"
                />
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-200">
              <Label htmlFor="editEmail" className="flex items-center text-sm font-semibold text-purple-700 mb-2">
                <Mail className="h-4 w-4 mr-2" />
                Correo Electrónico
              </Label>
              <Input
                id="editEmail"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="correo@ejemplo.com"
                className="border-purple-300 focus:border-purple-600"
              />
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-200">
              <Label htmlFor="editPhone" className="flex items-center text-sm font-semibold text-orange-700 mb-2">
                <Phone className="h-4 w-4 mr-2" />
                Número de Teléfono
              </Label>
              <Input
                id="editPhone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+57 300 123 4567"
                className="border-orange-300 focus:border-orange-600"
              />
            </div>
          </div>
          <DialogFooter className="bg-gray-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)} className="mr-2">
              Cancelar
            </Button>
            <Button
              onClick={handleEditEmployee}
              className="bg-gradient-to-r from-[#00457B] to-[#0066cc] hover:from-[#003b69] hover:to-[#0052a3]"
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#00457B] flex items-center">
              <Users className="h-6 w-6 mr-2" />
              Detalles del Empleado
            </DialogTitle>
            <DialogDescription className="text-gray-600">Información completa del empleado.</DialogDescription>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-500 uppercase tracking-wide flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      Documento
                    </Label>
                    <p className="text-xl font-bold text-[#00457B] mt-1">{selectedEmployee.document}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Estado</Label>
                    <div className="mt-2">
                      <Badge
                        variant={selectedEmployee.status === "active" ? "default" : "secondary"}
                        className={`text-sm px-4 py-2 ${selectedEmployee.status === "active" ? "bg-green-500" : "bg-gray-400"}`}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${selectedEmployee.status === "active" ? "bg-white" : "bg-gray-200"}`}
                          ></div>
                          {selectedEmployee.status === "active" ? "Activo" : "Inactivo"}
                        </div>
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <Label className="text-sm font-medium text-gray-500 uppercase tracking-wide flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Nombre Completo
                  </Label>
                  <p className="text-xl font-bold text-green-700 mt-1">
                    {selectedEmployee.firstName} {selectedEmployee.lastName}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-200">
                  <Label className="text-sm font-medium text-gray-500 uppercase tracking-wide flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    Correo Electrónico
                  </Label>
                  <p className="text-lg font-semibold text-purple-700 mt-1">{selectedEmployee.email}</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-200">
                <Label className="text-sm font-medium text-gray-500 uppercase tracking-wide flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Número de Teléfono
                </Label>
                <p className="text-xl font-bold text-orange-700 mt-1">{selectedEmployee.phone}</p>
              </div>
            </div>
          )}
          <DialogFooter className="bg-gray-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
            <Button variant="outline" onClick={() => setIsViewModalOpen(false)} className="w-full md:w-auto">
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
