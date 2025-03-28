// User Types
export interface User {
  id: string;
  username: string;
  name: string;
  rank: string;
  position?: string;
  unit?: string;
  yearsOfService?: number;
  commandTime?: string;
  responsibility?: string;
  valueManaged?: string;
  upcomingEvents?: Array<{title: string; date: string;}>;
  equipmentSummary?: {
    vehicles?: number;
    weapons?: number;
    communications?: number;
    opticalSystems?: number;
    sensitiveItems?: number;
  };
}

// Inventory Types
export interface InventoryItem {
  id: string;
  name: string;
  serialNumber: string;
  assignedDate: string;
  status: "active" | "pending" | "transferred";
}

// Transfer Types
export interface Transfer {
  id: string;
  name: string;
  serialNumber: string;
  from: string;
  to: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

// Activity Types
export interface Activity {
  id: string;
  type: "transfer-approved" | "transfer-rejected" | "inventory-updated" | "other";
  description: string;
  user: string;
  timeAgo: string;
}

// Notification Types
export interface Notification {
  id: string;
  type: "transfer-request" | "transfer-approved" | "system-alert" | "other";
  title: string;
  message: string;
  timeAgo: string;
  read: boolean;
}
