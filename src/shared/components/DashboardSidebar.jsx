import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/shared/components/ui/button"
import {
  Building,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Heart,
  Home,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Search,
  Settings,
  User,
} from "lucide-react"

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div
      className={`bg-white border-r border-gray-200 h-screen sticky top-0 transition-all duration-300 ${
        collapsed ? "w-[70px]" : "w-[250px]"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          {!collapsed && <h2 className="font-bold text-[#00457B]">Menú</h2>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 rounded-full hover:bg-gray-100"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          <NavItem
            to="/dashboard"
            icon={<LayoutDashboard className="h-5 w-5" />}
            label="Dashboard"
            active={isActive("/dashboard")}
            collapsed={collapsed}
          />
          <NavItem
            to="/dashboard/propiedades"
            icon={<Building className="h-5 w-5" />}
            label="Propiedades"
            active={isActive("/dashboard/propiedades")}
            collapsed={collapsed}
          />
          <NavItem
            to="/dashboard/favoritos"
            icon={<Heart className="h-5 w-5" />}
            label="Favoritos"
            active={isActive("/dashboard/favoritos")}
            collapsed={collapsed}
          />
          <NavItem
            to="/dashboard/buscar"
            icon={<Search className="h-5 w-5" />}
            label="Buscar"
            active={isActive("/dashboard/buscar")}
            collapsed={collapsed}
          />
          <NavItem
            to="/dashboard/mensajes"
            icon={<MessageSquare className="h-5 w-5" />}
            label="Mensajes"
            active={isActive("/dashboard/mensajes")}
            collapsed={collapsed}
            badge="5"
          />
          <NavItem
            to="/dashboard/visitas"
            icon={<Calendar className="h-5 w-5" />}
            label="Visitas"
            active={isActive("/dashboard/visitas")}
            collapsed={collapsed}
          />

          <div className={`mt-6 ${collapsed ? "pt-4" : "pt-6"} border-t border-gray-200`}>
            <NavItem
              to="/dashboard/perfil"
              icon={<User className="h-5 w-5" />}
              label="Mi Perfil"
              active={isActive("/dashboard/perfil")}
              collapsed={collapsed}
            />
            <NavItem
              to="/dashboard/configuracion"
              icon={<Settings className="h-5 w-5" />}
              label="Configuración"
              active={isActive("/dashboard/configuracion")}
              collapsed={collapsed}
            />
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <NavItem to="/" icon={<Home className="h-5 w-5" />} label="Ir al sitio" collapsed={collapsed} />
          <NavItem
            to="/logout"
            icon={<LogOut className="h-5 w-5" />}
            label="Cerrar sesión"
            collapsed={collapsed}
            className="text-red-500 hover:bg-red-50"
          />
        </div>
      </div>
    </div>
  )
}

function NavItem({ to, icon, label, active, collapsed, badge, className }) {
  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors ${
        active ? "bg-[#00457B]/10 text-[#00457B] font-medium" : ""
      } ${collapsed ? "justify-center" : ""} ${className || ""}`}
    >
      <div className={`${active ? "text-[#00457B]" : "text-gray-500"}`}>{icon}</div>
      {!collapsed && <span className="ml-3">{label}</span>}
      {!collapsed && badge && (
        <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 min-w-5 flex items-center justify-center px-1">
          {badge}
        </span>
      )}
      {collapsed && badge && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 min-w-4 flex items-center justify-center translate-x-1 -translate-y-1 px-1">
          {badge}
        </span>
      )}
    </Link>
  )
}