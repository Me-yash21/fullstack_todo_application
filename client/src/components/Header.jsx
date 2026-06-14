import { useNavigate } from 'react-router';
import authService from '../services/authService.js';
import { useAuthStore } from '../store/authStore.js';

export default function Header() {
  const user = useAuthStore((state) => state.user);
  const unsetUser = useAuthStore((state) => state.unsetUser);
  const navigate = useNavigate();

  function capitalizeName(name) {
    const formatedName = name
      .trim()
      .replace(/\s+/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    return formatedName;
  }

  const logoutOnClickHandler = async () => {
    try {
      await authService.logout();
      unsetUser();
      navigate('/login');
    } catch (error) {
      console.error('Something went wrong while logout the user:- ', user);
    }
  };
  return (
    <header>
      <nav className="h-20 border-b border-[#dddddd] flex items-center px-6 lg:px-16">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <div className="text-2xl font-bold text-[#222222]">TodoTask</div>
          <div>
            <div>
              <p>{capitalizeName(user.fullName)}</p>
            </div>
            <button
              onClick={logoutOnClickHandler}
              className="text-base font-medium text-[#d53333] hover:text-[#981212] transition-colors cursor-pointer"
            >
              logOut
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
