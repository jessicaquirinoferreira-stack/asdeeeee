import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  LogOut, 
  Save, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Calendar, 
  Phone, 
  Mail, 
  Instagram, 
  MessageCircle, 
  Sparkles, 
  FileText, 
  UserCheck, 
  Settings, 
  RefreshCw,
  Eye,
  KeyRound
} from 'lucide-react';
import { 
  SiteContent, 
  Testimonial, 
  Appointment, 
  Article,
  auth,
  loginAdmin,
  loginWithGoogle,
  logoutAdmin,
  getStoredAdminSession,
  ADMIN_MASTER_EMAIL,
  ADMIN_MASTER_PASS,
  updateSiteContent,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment
} from '../services/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  siteContent: SiteContent;
  onContentUpdated: (newContent: SiteContent) => void;
  testimonials: Testimonial[];
  onTestimonialsUpdated: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  siteContent,
  onContentUpdated,
  testimonials,
  onTestimonialsUpdated,
}) => {
  const [currentUser, setCurrentUser] = useState<User | { email: string; displayName?: string } | null>(() => getStoredAdminSession());
  const [email, setEmail] = useState(ADMIN_MASTER_EMAIL);
  const [password, setPassword] = useState(ADMIN_MASTER_PASS);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active admin tab: 'texts' | 'testimonials' | 'appointments' | 'contacts'
  const [activeTab, setActiveTab] = useState<'texts' | 'testimonials' | 'appointments' | 'contacts'>('texts');

  // Form states for site content
  const [formData, setFormData] = useState<SiteContent>(siteContent);
  const [isSavingTexts, setIsSavingTexts] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Appointments state
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(false);

  // Testimonial modal / form state
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isNewTestimonial, setIsNewTestimonial] = useState(false);
  const [testName, setTestName] = useState('');
  const [testRole, setTestRole] = useState('');
  const [testText, setTestText] = useState('');
  const [testVideoUrl, setTestVideoUrl] = useState('');
  const [testRating, setTestRating] = useState(5);
  const [isSavingTestimonial, setIsSavingTestimonial] = useState(false);

  useEffect(() => {
    setFormData(siteContent);
  }, [siteContent]);

  useEffect(() => {
    const stored = getStoredAdminSession();
    if (stored) {
      setCurrentUser(stored);
      loadAppointments();
    }

    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        loadAppointments();
      }
    });
    return () => unsub();
  }, []);

  const loadAppointments = async () => {
    setIsLoadingAppointments(true);
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (err) {
      console.warn("Could not load appointments:", err);
    } finally {
      setIsLoadingAppointments(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);
    try {
      const user = await loginAdmin(email.trim(), password.trim());
      setCurrentUser(user);
      await loadAppointments();
    } catch (err: any) {
      console.error("Login error:", err);
      setLoginError(err.message || "Credenciais inválidas. Verifique o e-mail e a senha.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoginError(null);
    setIsLoggingIn(true);
    try {
      const user = await loginWithGoogle();
      setCurrentUser(user);
      await loadAppointments();
    } catch (err: any) {
      console.error("Google login error:", err);
      setLoginError(err.message || "Falha ao autenticar com Google.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setCurrentUser(null);
  };

  const handleSaveSiteContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingTexts(true);
    setSaveSuccessMsg(null);
    try {
      await updateSiteContent(formData);
      onContentUpdated(formData);
      setSaveSuccessMsg("Alterações salvas com sucesso no Firestore!");
      setTimeout(() => setSaveSuccessMsg(null), 4000);
    } catch (err) {
      console.error("Error saving content:", err);
      alert("Erro ao salvar no Firestore. Verifique as permissões.");
    } finally {
      setIsSavingTexts(false);
    }
  };

  // Testimonial handlers
  const handleOpenNewTestimonial = () => {
    setEditingTestimonial(null);
    setIsNewTestimonial(true);
    setTestName('');
    setTestRole('');
    setTestText('');
    setTestVideoUrl('');
    setTestRating(5);
  };

  const handleOpenEditTestimonial = (t: Testimonial) => {
    setEditingTestimonial(t);
    setIsNewTestimonial(false);
    setTestName(t.name);
    setTestRole(t.role);
    setTestText(t.text);
    setTestVideoUrl(t.videoUrl || '');
    setTestRating(t.rating || 5);
  };

  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testName.trim() || !testText.trim()) return;

    setIsSavingTestimonial(true);
    try {
      if (isNewTestimonial) {
        await addTestimonial({
          name: testName,
          role: testRole || 'Paciente / Familiar',
          text: testText,
          videoUrl: testVideoUrl.trim() || undefined,
          rating: testRating,
          order: testimonials.length + 1,
        });
      } else if (editingTestimonial?.id) {
        await updateTestimonial(editingTestimonial.id, {
          name: testName,
          role: testRole,
          text: testText,
          videoUrl: testVideoUrl.trim() || undefined,
          rating: testRating,
        });
      }
      onTestimonialsUpdated();
      setEditingTestimonial(null);
      setIsNewTestimonial(false);
    } catch (err) {
      console.error("Error saving testimonial:", err);
    } finally {
      setIsSavingTestimonial(false);
    }
  };

  const handleDeleteTestimonial = async (id?: string) => {
    if (!id) return;
    if (confirm("Tem certeza que deseja excluir este depoimento?")) {
      await deleteTestimonial(id);
      onTestimonialsUpdated();
    }
  };

  // Appointment status change
  const handleChangeAppointmentStatus = async (id: string, status: Appointment['status']) => {
    await updateAppointmentStatus(id, status);
    loadAppointments();
  };

  const handleDeleteAppointment = async (id: string) => {
    if (confirm("Excluir este pré-agendamento do banco de dados?")) {
      await deleteAppointment(id);
      loadAppointments();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-[28px] max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-200 p-1 flex items-center justify-center shrink-0">
              <img
                src="https://i.postimg.cc/pdywVngt/Gemini-Generated-Image-vxl628vxl628vxl6.png"
                alt="Logo Estimulação Visual Brasil"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div>
              <h2 className="text-[18px] font-bold text-slate-900 leading-tight">
                Painel Administrativo
              </h2>
              <p className="text-[12px] text-slate-500 font-medium">
                Estimulação Visual Brasil • Gestão de Conteúdo e Pré-Agendamentos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentUser && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 text-xs font-semibold transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sair ({currentUser.email?.split('@')[0]})</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {!currentUser ? (
            /* Login Screen */
            <div className="max-w-md mx-auto py-8">
              <div className="text-center space-y-3 mb-8">
                <div className="w-20 h-20 rounded-3xl bg-white shadow-md border border-slate-200 p-2 flex items-center justify-center mx-auto">
                  <img
                    src="https://i.postimg.cc/pdywVngt/Gemini-Generated-Image-vxl628vxl628vxl6.png"
                    alt="Logo Estimulação Visual Brasil"
                    className="w-full h-full object-contain rounded-2xl"
                  />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Acesso Administrativo</h3>
                <p className="text-sm text-slate-500">
                  Estimulação Visual Brasil — Darlene Kloster
                </p>
              </div>

              {loginError && (
                <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium leading-relaxed">
                  {loginError}
                </div>
              )}

              {/* Master Credential Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-purple-50/80 border border-purple-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#8052ff] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Acesso Master Oficial</p>
                    <p className="text-[11px] text-slate-500">
                      Login: <code className="text-[#8052ff] font-bold">admin@x.com</code> • Senha: <code className="text-[#8052ff] font-bold">admin4321</code>
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    E-mail do Administrador
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@x.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#8052ff] focus:ring-2 focus:ring-[#8052ff]/20 outline-none text-slate-900 text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Senha
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="admin4321"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#8052ff] focus:ring-2 focus:ring-[#8052ff]/20 outline-none text-slate-900 text-sm font-medium"
                  />
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full py-3.5 rounded-full bg-[#8052ff] hover:bg-[#6e3df0] text-white text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
                  >
                    <Lock className="w-4 h-4" />
                    <span>{isLoggingIn ? 'Entrando no Painel...' : 'Entrar no Painel Admin'}</span>
                  </button>

                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink mx-3 text-xs text-slate-400 uppercase font-semibold">ou com Google</span>
                    <div className="flex-grow border-t border-slate-200"></div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isLoggingIn}
                    className="w-full py-3 px-4 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2.5 active:scale-[0.99]"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Entrar com Conta Google</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Authenticated Admin Tabs */
            <div className="space-y-6">
              
              {/* Navigation Tabs */}
              <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
                <button
                  onClick={() => setActiveTab('texts')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTab === 'texts'
                      ? 'bg-[#8052ff] text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  Textos do Site
                </button>

                <button
                  onClick={() => setActiveTab('testimonials')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                    activeTab === 'testimonials'
                      ? 'bg-[#8052ff] text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>Depoimentos</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-white/30 text-[10px]">
                    {testimonials.length}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('appointments');
                    loadAppointments();
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                    activeTab === 'appointments'
                      ? 'bg-[#8052ff] text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>Pré-Agendamentos</span>
                  {appointments.length > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-[#15846e] text-white text-[10px]">
                      {appointments.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('contacts')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTab === 'contacts'
                      ? 'bg-[#8052ff] text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  Contatos & Redes
                </button>
              </div>

              {saveSuccessMsg && (
                <div className="p-4 rounded-xl bg-[#e6f7f3] border border-[#ccfbf1] text-xs font-bold text-[#115e59] flex items-center gap-2 animate-fadeIn">
                  <Check className="w-4 h-4" />
                  <span>{saveSuccessMsg}</span>
                </div>
              )}

              {/* Tab 1: Textos do Site */}
              {activeTab === 'texts' && (
                <form onSubmit={handleSaveSiteContent} className="space-y-6">
                  
                  {/* Hero Section */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#8052ff]" />
                      <span>Hero & Chamada Principal</span>
                    </h4>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                        Badge Superior
                      </label>
                      <input
                        type="text"
                        value={formData.heroBadge}
                        onChange={(e) => setFormData({ ...formData, heroBadge: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-[#8052ff] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                        Título Principal (Headline)
                      </label>
                      <input
                        type="text"
                        value={formData.heroTitle}
                        onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-semibold focus:border-[#8052ff] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                        Subtítulo
                      </label>
                      <textarea
                        rows={2}
                        value={formData.heroSubtitle}
                        onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-[#8052ff] outline-none resize-none"
                      />
                    </div>
                  </div>

                  {/* About and Specialist texts */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-[#15846e]" />
                      <span>Sobre o Trabalho & Apresentação da Especialista</span>
                    </h4>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                        Texto 1: O que é Estimulação Visual
                      </label>
                      <textarea
                        rows={3}
                        value={formData.aboutText1}
                        onChange={(e) => setFormData({ ...formData, aboutText1: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-[#8052ff] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                        Texto 2: Abordagem Clínica e Lúdica
                      </label>
                      <textarea
                        rows={3}
                        value={formData.aboutText2}
                        onChange={(e) => setFormData({ ...formData, aboutText2: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-[#8052ff] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                        Biografia Darlene Kloster
                      </label>
                      <textarea
                        rows={3}
                        value={formData.aboutSpecialist}
                        onChange={(e) => setFormData({ ...formData, aboutSpecialist: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-[#8052ff] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                        Frase de Destaque / Citação
                      </label>
                      <input
                        type="text"
                        value={formData.specialistQuote}
                        onChange={(e) => setFormData({ ...formData, specialistQuote: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm italic focus:border-[#8052ff] outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={isSavingTexts}
                      className="px-6 py-3 rounded-full bg-[#8052ff] hover:bg-[#6e3df0] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isSavingTexts ? 'Salvando...' : 'Salvar Textos no Firestore'}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Tab 2: Depoimentos */}
              {activeTab === 'testimonials' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Gerenciador de Depoimentos</h3>
                      <p className="text-xs text-slate-500">Adicione, edite ou remova histórias de famílias atendidas.</p>
                    </div>
                    <button
                      onClick={handleOpenNewTestimonial}
                      className="px-4 py-2 rounded-xl bg-[#8052ff] hover:bg-[#6e3df0] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Novo Depoimento</span>
                    </button>
                  </div>

                  {/* Testimonials list */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {testimonials.map((t) => (
                      <div
                        key={t.id}
                        className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="font-bold text-slate-900 text-sm">{t.name}</span>
                            <div className="flex items-center gap-2">
                              {t.videoUrl && (
                                <span className="px-2 py-0.5 rounded-full bg-[#8052ff]/10 text-[#8052ff] text-[10px] font-bold uppercase">
                                  Vídeo
                                </span>
                              )}
                              <span className="text-[11px] text-[#ffb829] font-bold">★ {t.rating || 5}.0</span>
                            </div>
                          </div>
                          <p className="text-xs text-[#8052ff] font-semibold mb-3">{t.role}</p>
                          <p className="text-xs text-slate-600 italic leading-relaxed line-clamp-4">
                            "{t.text}"
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2 mt-4">
                          <button
                            onClick={() => handleOpenEditTestimonial(t)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-[#8052ff] hover:bg-slate-100 text-xs font-medium flex items-center gap-1"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Editar</span>
                          </button>
                          <button
                            onClick={() => handleDeleteTestimonial(t.id)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-red-600 hover:bg-red-50 text-xs font-medium flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Excluir</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add / Edit modal or inline form */}
                  {(isNewTestimonial || editingTestimonial) && (
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-300 space-y-4 mt-6">
                      <h4 className="text-sm font-bold text-slate-900">
                        {isNewTestimonial ? 'Adicionar Novo Depoimento' : 'Editar Depoimento'}
                      </h4>

                      <form onSubmit={handleSaveTestimonial} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Nome da Pessoa / Familiar
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Ex: Mariana S."
                              value={testName}
                              onChange={(e) => setTestName(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-[#8052ff] outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Relação / Idade / Diagnóstico
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Ex: Mãe do Pedro (4 anos, TEA)"
                              value={testRole}
                              onChange={(e) => setTestRole(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-[#8052ff] outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Link do Vídeo (Vimeo Embed ou YouTube, opcional)
                          </label>
                          <input
                            type="url"
                            placeholder="https://player.vimeo.com/video/... ou https://www.youtube.com/embed/..."
                            value={testVideoUrl}
                            onChange={(e) => setTestVideoUrl(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-[#8052ff] outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Depoimento / Relato da Experiência
                          </label>
                          <textarea
                            required
                            rows={4}
                            placeholder="Descreva a evolução e impacto do atendimento..."
                            value={testText}
                            onChange={(e) => setTestText(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-[#8052ff] outline-none resize-none"
                          />
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setIsNewTestimonial(false);
                              setEditingTestimonial(null);
                            }}
                            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold"
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            disabled={isSavingTestimonial}
                            className="px-5 py-2 rounded-xl bg-[#8052ff] hover:bg-[#6e3df0] text-white text-xs font-bold uppercase tracking-wider"
                          >
                            {isSavingTestimonial ? 'Salvando...' : 'Salvar Depoimento'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Pré-Agendamentos */}
              {activeTab === 'appointments' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Solicitações de Pré-Agendamento</h3>
                      <p className="text-xs text-slate-500">Pacientes e famílias que preencheram o formulário do site.</p>
                    </div>
                    <button
                      onClick={loadAppointments}
                      className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                      title="Atualizar lista"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>

                  {isLoadingAppointments ? (
                    <div className="py-12 text-center text-slate-400 text-sm">
                      Carregando agendamentos...
                    </div>
                  ) : appointments.length === 0 ? (
                    <div className="py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                      <Calendar className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm font-bold text-slate-700">Nenhum pré-agendamento registrado ainda.</p>
                      <p className="text-xs text-slate-500">As solicitações feitas no site aparecerão aqui em tempo real.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {appointments.map((app) => {
                        const cleanP = app.phone.replace(/\D/g, '');
                        const waMsg = encodeURIComponent(`Olá ${app.name}! Recebemos seu contato através do site Estimulação Visual Brasil sobre a avaliação.`);
                        const waLink = `https://wa.me/${cleanP.startsWith('55') ? cleanP : '55' + cleanP}?text=${waMsg}`;

                        return (
                          <div
                            key={app.id}
                            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                          >
                            <div className="space-y-1.5 max-w-xl">
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-slate-900 text-sm">{app.name}</h4>
                                {app.patientAge && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                                    Idade: {app.patientAge}
                                  </span>
                                )}
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                  app.status === 'new' ? 'bg-amber-100 text-amber-800' :
                                  app.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                                  app.status === 'scheduled' ? 'bg-green-100 text-green-800' :
                                  'bg-slate-100 text-slate-600'
                                }`}>
                                  {app.status === 'new' ? 'Novo' :
                                   app.status === 'contacted' ? 'Em Contato' :
                                   app.status === 'scheduled' ? 'Agendado' : 'Arquivado'}
                                </span>
                              </div>

                              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                                <span className="flex items-center gap-1 font-semibold text-slate-800">
                                  <Phone className="w-3.5 h-3.5 text-[#8052ff]" />
                                  {app.phone}
                                </span>
                                {app.email && (
                                  <span className="flex items-center gap-1">
                                    <Mail className="w-3.5 h-3.5 text-[#15846e]" />
                                    {app.email}
                                  </span>
                                )}
                                <span className="text-slate-400">
                                  {app.createdAt ? new Date(app.createdAt).toLocaleDateString('pt-BR') : ''}
                                </span>
                              </div>

                              <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200 mt-2">
                                <strong>Descrição do caso:</strong> {app.caseDescription}
                              </p>
                            </div>

                            <div className="flex flex-wrap md:flex-col items-end gap-2 shrink-0">
                              <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3.5 py-2 rounded-xl bg-[#8052ff] hover:bg-[#6e3df0] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>Chamar no WhatsApp</span>
                              </a>

                              <div className="flex items-center gap-1.5">
                                <select
                                  value={app.status}
                                  onChange={(e) => handleChangeAppointmentStatus(app.id!, e.target.value as any)}
                                  className="text-xs px-2 py-1.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-700"
                                >
                                  <option value="new">Status: Novo</option>
                                  <option value="contacted">Status: Em Contato</option>
                                  <option value="scheduled">Status: Agendado</option>
                                  <option value="archived">Status: Arquivado</option>
                                </select>

                                <button
                                  onClick={() => handleDeleteAppointment(app.id!)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                                  title="Excluir"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 4: Contatos & Redes */}
              {activeTab === 'contacts' && (
                <form onSubmit={handleSaveSiteContent} className="space-y-6">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#8052ff]" />
                      <span>Configurações de Contato e Redes</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                          WhatsApp (apenas números com DDD)
                        </label>
                        <input
                          type="text"
                          value={formData.whatsappNumber}
                          onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-[#8052ff] outline-none"
                        />
                        <span className="text-[11px] text-slate-400">Ex: 41996222432</span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                          Telefone Formatado (exibição)
                        </label>
                        <input
                          type="text"
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-[#8052ff] outline-none"
                        />
                        <span className="text-[11px] text-slate-400">Ex: (41) 99622-2432</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                          E-mail de Contato
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-[#8052ff] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                          Instagram
                        </label>
                        <input
                          type="text"
                          value={formData.instagram}
                          onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-[#8052ff] outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                          Endereço / Formato de Atendimento
                        </label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-[#8052ff] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                          Cidade / Abrangência
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-[#8052ff] outline-none"
                        />
                      </div>
                    </div>

                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={isSavingTexts}
                      className="px-6 py-3 rounded-full bg-[#8052ff] hover:bg-[#6e3df0] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isSavingTexts ? 'Salvando...' : 'Salvar Contatos no Firestore'}</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
