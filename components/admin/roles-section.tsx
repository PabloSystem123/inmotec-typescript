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
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Search, Edit, Eye, Trash2, Shield, Users, Building, DollarSign, Key, Calendar } from "lucide-react"

interface Role {
  id: number
  name: string
  status: "active" | "inactive"
  permissions: {
    roles: string[]
    users: string[]
    properties: string[]
    sales: string[]
    rentals: string[]
    appointments: string[]
  }
}

interface Permission {
  module: string
  actions: string[]
}

const permissionModules = [
  { key: "roles", label: "Roles", icon: Shield },
  { key: "users", label: "Usuarios", icon: Users },
  { key: "properties", label: "Reportes de Inmuebles", icon: Building },
  { key: "sales", label: "Ventas", icon: DollarSign },
  { key: "rentals", label: "Arrendamientos", icon: Key },
  { key: "appointments", label: "Citas", icon: Calendar },
]

const permissionActions = ["create", "edit", "delete", "view"]
const actionLabels = {
  create: "Crear",
  edit: "Editar",
  delete: "Eliminar",
  view: "Ver",
}

const actionEmojis = {
  create: "➕",
  edit: "✏️",
  delete: "🗑️",
  view: "👁️",
}

export function RolesSection() {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 1,
      name: "Administrador",
      status: "active",
      permissions: {
        roles: ["create", "edit", "delete", "view"],
        users: ["create", "edit", "delete", "view"],
        properties: ["create", "edit", "delete", "view"],
        sales: ["create", "edit", "delete", "view"],
        rentals: ["create", "edit", "delete", "view"],
        appointments: ["create", "edit", "delete", "view"],
      },
    },
    {
      id: 2,
      name: "Agente Inmobiliario",
      status: "active",
      permissions: {
        roles: [],
        users: ["view"],
        properties: ["create", "edit", "view"],
        sales: ["create", "edit", "view"],
        rentals: ["create", "edit", "view"],
        appointments: ["create", "edit", "view"],
      },
    },
    {
      id: 3,
      name: "Asistente",
      status: "active",
      permissions: {
        roles: [],
        users: ["view"],
        properties: ["view"],
        sales: ["view"],
        rentals: ["view"],
        appointments: ["create", "edit", "view"],
      },
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    permissions: {
      roles: [] as string[],
      users: [] as string[],
      properties: [] as string[],
      sales: [] as string[],
      rentals: [] as string[],
      appointments: [] as string[],
    },
  })

  const filteredRoles = roles.filter((role) => role.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleStatusChange = (roleId: number, newStatus: "active" | "inactive") => {
    setRoles(roles.map((role) => (role.id === roleId ? { ...role, status: newStatus } : role)))
  }

  const handleCreateRole = () => {
    const newRole: Role = {
      id: roles.length + 1,
      name: formData.name,
      status: "active",
      permissions: formData.permissions,
    }
    setRoles([...roles, newRole])
    setIsCreateModalOpen(false)
    resetForm()
  }

  const handleEditRole = () => {
    if (selectedRole) {
      setRoles(
        roles.map((role) =>
          role.id === selectedRole.id ? { ...role, name: formData.name, permissions: formData.permissions } : role,
        ),
      )
      setIsEditModalOpen(false)
      resetForm()
    }
  }

  const handleDeleteRole = (roleId: number) => {
    setRoles(roles.filter((role) => role.id !== roleId))
  }

  const resetForm = () => {
    setFormData({
      name: "",
      permissions: {
        roles: [],
        users: [],
        properties: [],
        sales: [],
        rentals: [],
        appointments: [],
      },
    })
    setSelectedRole(null)
  }

  const openEditModal = (role: Role) => {
    setSelectedRole(role)
    setFormData({
      name: role.name,
      permissions: role.permissions,
    })
    setIsEditModalOpen(true)
  }

  const openViewModal = (role: Role) => {
    setSelectedRole(role)
    setIsViewModalOpen(true)
  }

  const handlePermissionChange = (module: string, action: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [module]: checked
          ? [...prev.permissions[module as keyof typeof prev.permissions], action]
          : prev.permissions[module as keyof typeof prev.permissions].filter((a) => a !== action),
      },
    }))
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Roles</h2>
          <p className="text-gray-600">Administra los roles y permisos del sistema</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#00457B] to-[#0066cc] hover:from-[#003b69] hover:to-[#0052a3] shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              Crear Rol
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#00457B]">Crear Nuevo Rol</DialogTitle>
              <DialogDescription className="text-gray-600">
                Define el nombre del rol y selecciona los permisos correspondientes.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <Label htmlFor="roleName" className="text-lg font-semibold text-[#00457B]">
                  Nombre del Rol
                </Label>
                <Input
                  id="roleName"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: Agente Senior"
                  className="mt-2 border-blue-300 focus:border-[#00457B]"
                />
              </div>
              <div>
                <Label className="text-xl font-bold text-[#00457B] mb-6 block">Configuración de Permisos</Label>
                <div className="space-y-6">
                  {permissionModules.map((module) => {
                    const IconComponent = module.icon
                    return (
                      <div
                        key={module.key}
                        className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-[#00457B] to-[#0066cc] rounded-xl flex items-center justify-center mr-4 shadow-lg">
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          <h4 className="font-bold text-[#00457B] text-lg">{module.label}</h4>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {permissionActions.map((action) => (
                            <div
                              key={action}
                              className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 transition-all hover:shadow-sm"
                            >
                              <div className="flex items-center space-x-3">
                                <Checkbox
                                  id={`${module.key}-${action}`}
                                  checked={formData.permissions[
                                    module.key as keyof typeof formData.permissions
                                  ].includes(action)}
                                  onCheckedChange={(checked) =>
                                    handlePermissionChange(module.key, action, checked as boolean)
                                  }
                                  className="data-[state=checked]:bg-[#00457B] data-[state=checked]:border-[#00457B]"
                                />
                                <Label
                                  htmlFor={`${module.key}-${action}`}
                                  className="text-sm font-medium cursor-pointer flex items-center"
                                >
                                  <span className="text-lg mr-2">
                                    {actionEmojis[action as keyof typeof actionEmojis]}
                                  </span>
                                  {actionLabels[action as keyof typeof actionLabels]}
                                </Label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <DialogFooter className="bg-gray-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)} className="mr-2">
                Cancelar
              </Button>
              <Button
                onClick={handleCreateRole}
                className="bg-gradient-to-r from-[#00457B] to-[#0066cc] hover:from-[#003b69] hover:to-[#0052a3]"
              >
                Crear Rol
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="bg-gradient-to-r from-[#00457B] to-[#0066cc] text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">Lista de Roles</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
              <Input
                placeholder="Buscar roles..."
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
                <TableHead className="font-bold text-gray-700">Nombre del Rol</TableHead>
                <TableHead className="font-bold text-gray-700">Estado</TableHead>
                <TableHead className="font-bold text-gray-700">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoles.map((role) => (
                <TableRow key={role.id} className="hover:bg-blue-50 transition-colors">
                  <TableCell className="font-medium">{role.id}</TableCell>
                  <TableCell className="font-semibold text-[#00457B]">{role.name}</TableCell>
                  <TableCell>
                    <Select
                      value={role.status}
                      onValueChange={(value: "active" | "inactive") => handleStatusChange(role.id, value)}
                      disabled={role.name === "Administrador"}
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
                        onClick={() => openViewModal(role)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditModal(role)}
                        className="text-green-600 hover:text-green-800 hover:bg-green-50"
                        disabled={role.name === "Administrador"}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {role.name !== "Administrador" && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-800 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Esto eliminará permanentemente el rol "{role.name}"
                                del sistema.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteRole(role.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
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
        <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#00457B]">Editar Rol</DialogTitle>
            <DialogDescription className="text-gray-600">
              Modifica el nombre del rol y ajusta los permisos según sea necesario.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <Label htmlFor="editRoleName" className="text-lg font-semibold text-[#00457B]">
                Nombre del Rol
              </Label>
              <Input
                id="editRoleName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Agente Senior"
                className="mt-2 border-blue-300 focus:border-[#00457B]"
              />
            </div>
            <div>
              <Label className="text-xl font-bold text-[#00457B] mb-6 block">Configuración de Permisos</Label>
              <div className="space-y-6">
                {permissionModules.map((module) => {
                  const IconComponent = module.icon
                  return (
                    <div
                      key={module.key}
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#00457B] to-[#0066cc] rounded-xl flex items-center justify-center mr-4 shadow-lg">
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="font-bold text-[#00457B] text-lg">{module.label}</h4>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {permissionActions.map((action) => (
                          <div
                            key={action}
                            className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 transition-all hover:shadow-sm"
                          >
                            <div className="flex items-center space-x-3">
                              <Checkbox
                                id={`edit-${module.key}-${action}`}
                                checked={formData.permissions[module.key as keyof typeof formData.permissions].includes(
                                  action,
                                )}
                                onCheckedChange={(checked) =>
                                  handlePermissionChange(module.key, action, checked as boolean)
                                }
                                className="data-[state=checked]:bg-[#00457B] data-[state=checked]:border-[#00457B]"
                              />
                              <Label
                                htmlFor={`edit-${module.key}-${action}`}
                                className="text-sm font-medium cursor-pointer flex items-center"
                              >
                                <span className="text-lg mr-2">
                                  {actionEmojis[action as keyof typeof actionEmojis]}
                                </span>
                                {actionLabels[action as keyof typeof actionLabels]}
                              </Label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <DialogFooter className="bg-gray-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)} className="mr-2">
              Cancelar
            </Button>
            <Button
              onClick={handleEditRole}
              className="bg-gradient-to-r from-[#00457B] to-[#0066cc] hover:from-[#003b69] hover:to-[#0052a3]"
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#00457B] flex items-center">
              <Shield className="h-6 w-6 mr-2" />
              Detalles del Rol
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Información completa del rol y sus permisos asignados.
            </DialogDescription>
          </DialogHeader>
          {selectedRole && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Nombre del Rol</Label>
                    <p className="text-2xl font-bold text-[#00457B] mt-1">{selectedRole.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Estado</Label>
                    <div className="mt-2">
                      <Badge
                        variant={selectedRole.status === "active" ? "default" : "secondary"}
                        className={`text-sm px-4 py-2 ${selectedRole.status === "active" ? "bg-green-500" : "bg-gray-400"}`}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${selectedRole.status === "active" ? "bg-white" : "bg-gray-200"}`}
                          ></div>
                          {selectedRole.status === "active" ? "Activo" : "Inactivo"}
                        </div>
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-xl font-bold text-[#00457B] mb-6 block">Permisos Asignados</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {permissionModules.map((module) => {
                    const modulePermissions =
                      selectedRole.permissions[module.key as keyof typeof selectedRole.permissions]
                    const IconComponent = module.icon
                    return (
                      <div
                        key={module.key}
                        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-[#00457B] to-[#0066cc] rounded-xl flex items-center justify-center mr-3 shadow-lg">
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          <h4 className="font-bold text-[#00457B] text-lg">{module.label}</h4>
                        </div>
                        <div className="space-y-2">
                          {modulePermissions.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {modulePermissions.map((permission) => (
                                <Badge
                                  key={permission}
                                  variant="outline"
                                  className="bg-blue-50 border-blue-200 text-blue-700 px-3 py-1"
                                >
                                  <span className="mr-2">{actionEmojis[permission as keyof typeof actionEmojis]}</span>
                                  {actionLabels[permission as keyof typeof actionLabels]}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <div className="text-gray-500 text-sm bg-gray-50 p-3 rounded-lg border border-gray-200">
                              <span className="mr-2">🚫</span>
                              Sin permisos asignados
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
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
