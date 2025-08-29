"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Building,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  Shield,
  BarChart3,
} from "lucide-react"

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div
      className={`bg-white border-r border-gray-200 h-screen sticky top-0 transition-all duration-300 ${
        collapsed ? "w-[70px]" : "w-[250px]"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          {!collapsed && <h2 className="font-bold text-[#00457B]">Admin Panel</h2>}
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
            href="/admin/dashboard"
            icon={<LayoutDashboard className="h-5 w-5" />}
            label="Dashboard"
            active={isActive("/admin/dashboard")}
            collapsed={collapsed}
          />
          <NavItem
            href="/admin/roles"
            icon={<Shield className="h-5 w-5" />}
            label="Roles"
            active={isActive("/admin/roles")}
            collapsed={collapsed}
          />
          <NavItem
            href="/admin/employees"
            icon={<Users className="h-5 w-5" />}
            label="Empleados"
            active={isActive("/admin/employees")}
            collapsed={collapsed}
          />
          <NavItem
            href="/admin/properties"
            icon={<Building className="h-5 w-5" />}
            label="Inmuebles"
            active={isActive("/admin/properties")}
            collapsed={collapsed}
          />
          <NavItem
            href="/admin/reports"
            icon={<BarChart3 className="h-5 w-5" />}
            label="Reportes"
            active={isActive("/admin/reports")}
            collapsed={collapsed}
          />
          <NavItem
            href="/admin/appointments"
            icon={<Calendar className="h-5 w-5" />}
            label="Citas"
            active={isActive("/admin/appointments")}
            collapsed={collapsed}
          />

          <div className={`mt-6 ${collapsed ? "pt-4" : "pt-6"} border-t border-gray-200`}>
            <NavItem
              href="/admin/settings"
              icon={<Settings className="h-5 w-5" />}
              label="Configuración"
              active={isActive("/admin/settings")}
              collapsed={collapsed}
            />
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <NavItem href="/" icon={<Home className="h-5 w-5" />} label="Ir al sitio" collapsed={collapsed} />
          <NavItem
            href="/logout"
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

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  active?: boolean
  collapsed?: boolean
  badge?: string
  className?: string
}

function NavItem({ href, icon, label, active, collapsed, badge, className }: NavItemProps) {
  return (
    <Link
      href={href}
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
    </Link>
  )
}
