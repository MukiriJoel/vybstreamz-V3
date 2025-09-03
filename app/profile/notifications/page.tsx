"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, Search, ShoppingCart, X, TriangleAlert } from "lucide-react";
import { IconButton } from "@mui/material";
import { MdClose } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function NotificationsPage() {
  const [showSubscriptionAlert, setShowSubscriptionAlert] = useState(true);
  const Router = useRouter();

  const notifications = [
    {
      id: 1,
      title: "New Season Is Here",
      date: "06/07/2025",
      hasImage: true,
      image: "/images/vid4.png",
    },
    {
      id: 2,
      title: "Listen to Diamond's new song",
      date: "06/12/2025",
      hasImage: true,
      image: "/images/vid6.png",
    },
  ];

  const goToSubscription = () => {
    Router.push("/planSelection");
  };

  const OnMarkAllAsRead = () => {};

  return (
    <div className="min-h-screen w-screen lg:w-[calc(95vw-256px)] bg-[#F2F2F2] dark:bg-[#141414]  pt-8">
      {/* Header */}

      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-[#FFFFFF] mb-8">
            My Notifications
          </h2>
          <button
            onClick={() => OnMarkAllAsRead()}
            className="cursor-pointer px-10 py-3 mb-6 bg-[#333333] dark:bg-[#2C2C2C] text-white rounded-lg hover:bg-[#c62676] dark:hover:bg-[#c62676] focus:ring-2 focus:ring-[#c62676] focus:bg-[#c62676]  transition-colors"
          >
            Mark All As Read
          </button>

          <div className="space-y-8">
            {/* Notifications List */}
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center space-x-4 pb-6 border-b-2 border-[#999999]"
              >
                {notification.hasImage && (
                  <div className="w-28 h-32 overflow-hidden flex-shrink-0">
                    <img
                      src={notification.image}
                      className="w-full h-full"
                    ></img>
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#2C2C2C] dark:text-[#FFFFFF] mb-1">
                    {notification.title}
                  </h3>
                  <p className="text-sm text-[#2C2C2C] dark:text-white">
                    {notification.date}
                  </p>
                </div>
                <div className="">
                  <IconButton className="cursor-pointer rounded-full hover:!bg-[#C62676] ">
                    <MdClose className="text-[#2C2C2C] dark:text-white hover:text-white" />
                  </IconButton>
                </div>
              </div>
            ))}

            {/* Subscription Alert */}
            {showSubscriptionAlert && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 relative">
                <button
                  onClick={() => setShowSubscriptionAlert(false)}
                  className="absolute top-4 cursor-pointer right-4 text-[#2C2C2C] hover:text-[#2C2C2C]"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <TriangleAlert className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Subscription has expired!
                    </h3>
                    <p className="text-sm text-[#2C2C2C] mb-4">
                      Your Spotify subscription expired on 12/07/2025. Check on
                      your account to resolve issue
                    </p>
                    <Button
                      onClick={() => goToSubscription()}
                      className="bg-pink-500 hover:bg-pink-600 text-white"
                    >
                      Subscribe Now
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
