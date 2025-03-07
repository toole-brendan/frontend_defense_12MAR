import { useContext } from "react";
import { useLocation, Link } from "wouter";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useApp } from "@/context/AppContext";
import {
  Home,
  Package,
  Send,
  ClipboardList,
  Settings,
  BarChart3,
  Menu,
  Moon,
  Sun,
  QrCode,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  isMobile?: boolean;
  closeMobileMenu?: () => void;
  openQRScanner?: () => void;
  toggleTheme?: () => void;
  toggleSidebar?: () => void;
}

const Sidebar = ({
  isMobile = false,
  closeMobileMenu,
  openQRScanner,
  toggleTheme: toggleThemeProp,
  toggleSidebar: toggleSidebarProp
}: SidebarProps) => {
  const [location] = useLocation();
  const { user } = useAuth();
  const { theme, toggleTheme: contextToggleTheme, sidebarCollapsed, toggleSidebar: contextToggleSidebar } = useApp();

  // Use the functions from context directly if they're not passed as props
  const toggleTheme = () => {
    if (toggleThemeProp) {
      toggleThemeProp();
    } else {
      contextToggleTheme();
    }
  };
  
  const toggleSidebar = () => {
    if (toggleSidebarProp) {
      toggleSidebarProp();
    } else {
      contextToggleSidebar();
    }
  };

  const isActive = (path: string) => {
    return location === path;
  };

  const handleLinkClick = (onClick?: () => void) => {
    if (onClick) {
      onClick();
    }
    
    if (isMobile && closeMobileMenu) {
      closeMobileMenu();
    }
  };
  
  const handleLogoClick = () => {
    // Navigate to the dashboard page
    window.location.href = '/';
  };
  
  const handleQRScanClick = () => {
    if (openQRScanner) {
      openQRScanner();
    }
    if (isMobile && closeMobileMenu) {
      closeMobileMenu();
    }
  };

  interface NavItem {
    path: string;
    icon: React.ReactNode;
    label: string;
    notificationCount?: number;
    onClick?: () => void;
  }

  // Using the original nav items from the app
  const navItems: NavItem[] = [
    { path: "/", icon: <Home className="sidebar-item-icon" />, label: "Dashboard" },
    { path: "/inventory", icon: <ClipboardList className="sidebar-item-icon" />, label: "Inventory" },
    { 
      path: "/scan", 
      icon: <QrCode className="sidebar-item-icon" />, 
      label: "Scan",
      onClick: handleQRScanClick
    },
    { 
      path: "/transfers", 
      icon: <Send className="sidebar-item-icon" />, 
      label: "Transfers",
      notificationCount: 3
    },
    { path: "/audit-log", icon: <BarChart3 className="sidebar-item-icon" />, label: "Audit Log" },
    { path: "/settings", icon: <Settings className="sidebar-item-icon" />, label: "Settings" }
  ];

  if (isMobile) {
    return (
      <nav className="flex-1 p-4 space-y-1">
        {/* Mobile Logo */}
        <div 
          className="flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity mb-4"
          onClick={handleLogoClick}
        >
          <div className="border border-gray-800/70 dark:border-gray-100/70 px-4 py-1.5">
            <h1 className="text-lg font-light tracking-widest text-gray-800 dark:text-gray-100 m-0 font-serif">HandReceipt</h1>
          </div>
        </div>
        
        {navItems.map((item) => 
          item.onClick ? (
            <div 
              key={item.path}
              onClick={() => handleLinkClick(item.onClick)}
              className={`sidebar-item ${isActive(item.path) ? "active" : ""}`}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.notificationCount && (
                <span className="ml-auto inline-flex items-center justify-center h-5 w-5 text-xs font-medium text-white bg-blue-600 rounded-full">
                  {item.notificationCount}
                </span>
              )}
            </div>
          ) : (
            <Link key={item.path} href={item.path}>
              <div 
                onClick={() => handleLinkClick()}
                className={`sidebar-item ${isActive(item.path) ? "active" : ""}`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.notificationCount && (
                  <span className="ml-auto inline-flex items-center justify-center h-5 w-5 text-xs font-medium text-white bg-blue-600 rounded-full">
                    {item.notificationCount}
                  </span>
                )}
              </div>
            </Link>
          )
        )}
        
        <div className="mt-8 pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between px-4 py-3 mb-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-blue-900/50 transition-colors"
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? 
                <Moon className="h-5 w-5 text-gray-800 dark:text-gray-200" /> : 
                <Sun className="h-5 w-5 text-gray-800 dark:text-gray-200" />
              }
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-medium">
                {user?.name?.substring(0, 1) || 'U'}
              </div>
              <div>
                <p className="text-sm font-medium profile-name">{user?.name || 'User'}</p>
                <p className="text-xs profile-role">{user?.rank || 'Member'}</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <aside className={`sidebar hidden md:flex flex-col ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="p-4 border-b border-gray-700/50 dark:border-border-primary">
        {!sidebarCollapsed ? (
          <div 
            className="flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
            onClick={handleLogoClick}
          >
            <div className="border border-gray-800/70 dark:border-gray-100/70 px-4 py-1.5">
              <h1 className="text-lg font-light tracking-widest text-gray-800 dark:text-gray-100 m-0 font-serif">HandReceipt</h1>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-5">
            {/* Empty div to maintain spacing in collapsed mode */}
          </div>
        )}
      </div>
      
      <nav className={`flex-1 px-2 py-4 space-y-1 overflow-y-auto ${sidebarCollapsed ? 'collapsed' : ''}`}>
        {navItems.map((item) => 
          item.onClick ? (
            <div 
              key={item.path}
              onClick={() => handleLinkClick(item.onClick)}
              className={`sidebar-item ${isActive(item.path) ? "active" : ""}`}
            >
              {item.icon}
              {!sidebarCollapsed && <span>{item.label}</span>}
              {item.notificationCount && !sidebarCollapsed && (
                <span className="ml-auto inline-flex items-center justify-center h-5 w-5 text-xs font-medium text-white bg-blue-600 rounded-full">
                  {item.notificationCount}
                </span>
              )}
            </div>
          ) : (
            <Link key={item.path} href={item.path}>
              <div
                className={`sidebar-item ${isActive(item.path) ? "active" : ""}`}
                onClick={() => handleLinkClick()}
              >
                {item.icon}
                {!sidebarCollapsed && <span>{item.label}</span>}
                {item.notificationCount && !sidebarCollapsed && (
                  <span className="ml-auto inline-flex items-center justify-center h-5 w-5 text-xs font-medium text-white bg-blue-600 rounded-full">
                    {item.notificationCount}
                  </span>
                )}
              </div>
            </Link>
          )
        )}
      </nav>
      
      <div className={`p-4 border-t border-gray-700/50 dark:border-border-primary ${sidebarCollapsed ? 'collapsed' : ''}`}>
        {!sidebarCollapsed && (
          <>
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-blue-900/50 transition-colors"
                title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                {theme === 'light' ? 
                  <Moon className="h-5 w-5 text-gray-800 dark:text-gray-200" /> : 
                  <Sun className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                }
              </button>
              
              <button 
                onClick={toggleSidebar}
                className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                title="Collapse sidebar"
              >
                <ChevronLeft className="h-5 w-5 text-black dark:text-white" />
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-medium">
                {user?.name?.substring(0, 1) || 'U'}
              </div>
              <div>
                <p className="text-sm font-medium profile-name">{user?.name || 'User'}</p>
                <p className="text-xs profile-role">{user?.rank || 'Member'}</p>
              </div>
            </div>
          </>
        )}
        
        {sidebarCollapsed && (
          <div className="flex flex-col items-center gap-4">
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              title="Expand sidebar"
            >
              <ChevronRight className="h-5 w-5 text-black dark:text-white" />
            </button>
            
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-medium">
              {user?.name?.substring(0, 1) || 'U'}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;