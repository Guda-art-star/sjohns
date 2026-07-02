export interface Announcement {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description: string;
}

export interface QuickLink {
  title: string;
  url: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { name: string; description: string }[];
}
