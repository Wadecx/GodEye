'use client';

export function LogoutButton() {
  const handleLogout = () => {
    // Supprimer le cookie token
    document.cookie = 'token=; path=/; max-age=0';
    // Rediriger vers la page de login
    window.location.href = '/login';
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
    >
      Déconnexion
    </button>
  );
}
