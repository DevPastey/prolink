import { Navigate, Outlet, useLocation } from "react-router";
import { Navbar } from "./Navbar";
import { items } from "../constants/authList"

export default function AuthLayout() {
  const location = useLocation();
  
  // Replace this with your actual auth state logic (e.g., Context, Redux, Zustand)
  const isAuthenticated = Boolean(localStorage.getItem("token")); 

  // Define routes that logged-in users should not access
  const publicAuthRoutes = ["/auth/login", "/auth/signup", "/explore"];
  const isAuthRoute = publicAuthRoutes.includes(location.pathname);

  // 1. Guard protected routes: Redirect to login if unauthenticated
  if (!isAuthenticated && !isAuthRoute) {
    return <Navigate to="auth/login" state={{ from: location }} replace />;
  }

  // 2. Prevent logged-in users from seeing login/signup pages
  if (isAuthenticated && isAuthRoute) {
    return <Navigate to="/" replace />;
  }

  // 3. Render layout framework and child routes
  return (
    <div className="min-h-screen flex flex-col bg-background text-gray-900">
      {/* Optional: Add a shared layout element like a Navbar, Sidebar, or Wrapper */}
      {isAuthenticated && <header className="p-4 border-b bg-white">App Navbar</header>}

      <Navbar />
      
      <main className="grid grid-cols-5 mt-18">
        <section className="col-span-3 px-6">
            {/* This section can be used for a shared banner, welcome message, or left sidebar */}
            <div className="grid grid-cols-2 h-full">
                <div className=" text-white py-12 px-4 flex flex-col gap-6">

                    <div className="w-[220px] md:text-2xl 2xl:text-3xl font-semibold">
                        <p>Where talent</p>
                        <p>meets opportunity</p>
                        <p>and <span className="text-primary">grows together</span> </p>
                    </div>

                    <div>
                        <p className="text-sm 2xl:text-lg text-gray-300">
                            Connect with top talent, discover new opportunities, grow your business and work done faster than ever with ProLink. Join us today and unlock your potential!
                        </p>
                    </div>

                    <div>
                        {items.map((item) => (
                            <div key={item.id} className="flex gap-4 mb-4">
                                <div className="w-20 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold [clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)]">
                                    <item.icon className="max-w-18 max-h-18 text-white mt-1" />
                                </div> 

                                <div>
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                    <p className="text-gray-300 text-sm">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-pink-500">Welcome</div>
            </div>
        </section>
        {/* This renders the specific page component (e.g., HomePage, LoginPage) */}
        <Outlet />
      </main>
    </div>
  );
}
