import { Inbox } from "lucide-react";

interface EmptyStateProps {
  message?: string;
  icon?: React.ReactNode;
}

export function EmptyState({ message = "No items", icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-gray-500">
      {icon || <Inbox className="w-8 h-8 mb-2 opacity-50" />}
      <p className="text-sm">{message}</p>
    </div>
  );
}
