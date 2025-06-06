
"use client";

import { cn } from '@/lib/utils';
import { CheckCircle, Circle, Package, Truck, Home, XCircle, RefreshCw } from 'lucide-react';
import type { Order } from '@/lib/types';

interface OrderStatusVisualizerProps {
  currentStatus: Order['status'];
}

const statusSteps: { status: Order['status']; label: string; icon: React.ElementType }[] = [
  { status: 'Pending', label: 'Order Placed', icon: Package },
  { status: 'Processing', label: 'Processing', icon: RefreshCw },
  { status: 'Shipped', label: 'Shipped', icon: Truck },
  { status: 'Delivered', label: 'Delivered', icon: Home },
];

const statusCancelled = { status: 'Cancelled', label: 'Order Cancelled', icon: XCircle };

export function OrderStatusVisualizer({ currentStatus }: OrderStatusVisualizerProps) {
  if (currentStatus === 'Cancelled') {
    return (
      <div className="flex items-center space-x-4 p-4 rounded-md bg-destructive/10 border border-destructive/30">
        <statusCancelled.icon className="h-8 w-8 text-destructive" />
        <div>
          <p className="font-semibold text-destructive">{statusCancelled.label}</p>
          <p className="text-sm text-destructive/80">This order has been cancelled.</p>
        </div>
      </div>
    );
  }

  const currentStepIndex = statusSteps.findIndex(step => step.status === currentStatus);

  return (
    <div className="w-full">
      <h4 className="text-md font-semibold mb-4 text-center sm:text-left">Order Progress</h4>
      <div className="flex flex-col sm:flex-row items-stretch justify-between space-y-4 sm:space-y-0 sm:space-x-2 relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-muted hidden sm:block">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out" 
            style={{ width: `${Math.max(0, (currentStepIndex / (statusSteps.length -1)) * 100)}%`}}
          ></div>
        </div>

        {statusSteps.map((step, index) => {
          const isActive = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <div key={step.status} className="flex-1 min-w-0 relative">
              <div className={cn(
                  "flex flex-col items-center text-center p-2 rounded-md transition-colors duration-300",
                  isActive ? "bg-primary/10 border border-primary/30" : "bg-muted/50",
                  isCurrent && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                )}>
                <div className={cn(
                    "rounded-full p-2 mb-2 transition-colors duration-300",
                    isActive ? "bg-primary text-primary-foreground" : "bg-muted-foreground/30 text-muted-foreground"
                  )}>
                  {isActive ? <CheckCircle className="h-6 w-6" /> : <step.icon className="h-6 w-6" />}
                </div>
                <p className={cn(
                    "font-medium text-sm",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}>{step.label}</p>
                {isCurrent && <p className="text-xs text-foreground/70 mt-1">Current Status</p>}
              </div>
              {/* Vertical connector for mobile */}
              {index < statusSteps.length - 1 && (
                <div className="sm:hidden absolute left-1/2 -bottom-2.5 transform -translate-x-1/2 w-0.5 h-4 bg-muted">
                   <div 
                    className={cn("h-full bg-primary transition-all duration-500 ease-out", isActive ? "bg-primary": "bg-muted")} 
                    style={{height: isActive ? '100%' : '0%'}}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

