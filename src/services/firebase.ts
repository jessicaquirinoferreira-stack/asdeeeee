import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  User 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp, 
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
    },
    operationType,
    path,
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Data models
export interface SiteContent {
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutText1: string;
  aboutText2: string;
  aboutSpecialist: string;
  specialistQuote: string;
  whatsappNumber: string;
  phoneNumber: string;
  email: string;
  instagram: string;
  address: string;
  city: string;
  updatedAt?: string;
}

export interface Testimonial {
  id?: string;
  name: string;
  role: string;
  text: string;
  videoUrl?: string;
  rating?: number;
  order?: number;
  createdAt?: string;
}

export interface Appointment {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  patientAge?: string;
  caseDescription: string;
  status: 'new' | 'contacted' | 'scheduled' | 'archived';
  createdAt?: string;
}

export interface Article {
  id?: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  readTime: string;
  imageUrl?: string;
  order?: number;
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  heroBadge: "ESTIMULAÇÃO VISUAL MODULADA & NEUROVISÃO",
  heroTitle: "Estimulação Visual para uma vida com mais clareza e autonomia",
  heroSubtitle: "Avaliação funcional da visão, neurovisão e reabilitação modulada individualizada para bebês, crianças, neurodivergentes (TEA/TDAH) e adultos.",
  aboutText1: "A Estimulação Visual Modulada é uma abordagem terapêutica especializada que potencializa a eficiência das vias visuais e das conexões neurais. O cérebro aprende a ver através da neuroplasticidade, transformando estímulos controlados em autonomia e compreensão do mundo.",
  aboutText2: "Trabalhamos de forma acolhedora, científica e lúdica para que cada paciente desenvolva o máximo do seu potencial visual funcional nas atividades do dia a dia, escolares e sociais.",
  aboutSpecialist: "Com anos de dedicação à saúde visual e neurodesenvolvimento, Darlene Kloster é especialista em Estimulação Visual e Reabilitação Neurofuncional. Seu trabalho une precisão técnica, sensibilidade humana e protocolos modernos baseados em neurociência para transformar o futuro visual de seus pacientes e trazer tranquilidade às famílias.",
  specialistQuote: "Enxergar não é apenas receber luz nos olhos, é permitir que o cérebro compreenda, interaja e se encante com o mundo.",
  whatsappNumber: "41996222432",
  phoneNumber: "(41) 99622-2432",
  email: "contato@estimulacaovisualbrasil.com.br",
  instagram: "@darlingkloster",
  address: "Atendimento Clínico Especializado & Consultorias",
  city: "Curitiba - PR & Teleorientação para todo o Brasil",
};

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "test-rafael-video",
    name: "Michele, Rafa e família",
    role: "Mãe do Rafael (Síndrome de West & Dup15q • 9 anos de evolução)",
    text: "A Estimulação Visual faz parte da história do Rafael desde bebê e foi essencial para o seu desenvolvimento.\n\nO Rafael tem Síndrome de West, duplicação do cromossomo 15q (Dup15q), e outras comodidades. Desde muito pequeno, recebemos todo o suporte necessário, sempre com um olhar individualizado e muito carinho.\n\nAo longo desses anos, acompanhamos inúmeras conquistas. A Estimulação Visual contribuiu para o desenvolvimento da atenção, da percepção visual, da coordenação visomotora e das habilidades necessárias para a aprendizagem, refletindo diretamente em seu desempenho nas atividades do dia a dia e na escola.\n\nMais do que uma excelente profissional, você sempre foi uma parceira da nossa família, acolhendo nossas dúvidas, orientando nossos caminhos e celebrando cada pequena evolução junto conosco.\n\nNossa gratidão é imensa. Seu trabalho transformou a vida do Rafael e também trouxe mais esperança, segurança e tranquilidade para toda a nossa família. Obrigada por fazer parte da nossa história desde os primeiros meses de vida. E já são 9 anos de muita parceria e evolução.",
    videoUrl: "https://player.vimeo.com/video/1231288791?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1",
    rating: 5,
    order: 1,
  },
  {
    id: "test-1",
    name: "Mariana S.",
    role: "Mãe do Pedro (4 anos, TEA)",
    text: "O Pedro tinha muita dificuldade de fixação visual e se desorganizava facilmente com estímulos. Após os atendimentos com a Darlene, ele começou a fazer contato visual com muito mais segurança e o rendimento dele na terapia e na escolinha mudou completamente!",
    rating: 5,
    order: 2,
  },
  {
    id: "test-2",
    name: "Rodrigo F.",
    role: "Pai da Clara (2 anos, DVC)",
    text: "Receber o diagnóstico de Deficiência Visual Cortical nos assustou muito. Encontrar a Darlene foi um divisor de águas. Ela nos deu clareza, ensinou a adaptar o ambiente de casa e hoje a Clara alcança seus brinquedos com precisão. Gratidão eterna!",
    rating: 5,
    order: 3,
  },
  {
    id: "test-3",
    name: "Ana Paula G.",
    role: "Mãe do Lucas (7 anos, Baixa Visão)",
    text: "O atendimento é extremamente humanizado e técnico ao mesmo tempo. A Darlene não trata apenas os olhos, ela cuida da criança como um todo e capacita a família para dar continuidade aos estímulos no dia a dia.",
    rating: 5,
    order: 4,
  }
];

export const DEFAULT_ARTICLES: Article[] = [
  {
    id: "art-1",
    title: "Sinais de que seu filho pode precisar de Estimulação Visual",
    category: "Desenvolvimento Infantil",
    summary: "Dificuldade para acompanhar objetos, esfregar os olhos com frequência, aproximar muito o rosto das telas ou evitar luzes fortes podem ser sinais de alerta.",
    content: `O desenvolvimento visual ocorre de forma intensa nos primeiros anos de vida. Quando há algum atraso ou alteração neurológica, a criança pode apresentar comportamentos característicos:\n\n1. Desinteresse visual por rostos ou brinquedos coloridos;\n2. Inclinar ou girar excessivamente a cabeça para olhar;\n3. Dificuldade em alcançar brinquedos ou tropeçar com frequência;\n4. Incômodo excessivo ou busca constante por luzes fortes;\n5. Fadiga rápida durante tarefas de leitura ou desenho.\n\nIdentificar precocemente essas respostas permite intervenções moduladas que aproveitam o ápice da neuroplasticidade infantil.`,
    readTime: "4 min de leitura",
    order: 1,
  },
  {
    id: "art-2",
    title: "Neurovisão no TEA e TDAH: A conexão entre olhar, foco e regulação",
    category: "Neurodivergência",
    summary: "Como a modulação de estímulos visuais auxilia no processamento sensorial, diminui a fadiga ocular e aprimora a atenção sustentada.",
    content: `Crianças no espectro autista ou com TDAH frequentemente vivenciam sobrecargas no processamento sensorial. A visão é responsável por mais de 80% das informações que chegam ao cérebro.\n\nNa abordagem de Neurovisão:\n- Avaliamos a estabilidade do rastreio ocular e a motilidade sacádica;\n- Identificamos hipersensibilidades a contrastes, luzes pulsantes ou padrões repetitivos;\n- Desenvolvemos exercícios modulados que favorecem a regulação emocional e o engajamento social.\n\nCom a visão organizada, a criança ganha calma e capacidade de foco.`,
    readTime: "5 min de leitura",
    order: 2,
  },
  {
    id: "art-3",
    title: "DVC (Deficiência Visual Cortical): O que é e o papel da intervenção precoce",
    category: "Reabilitação Visual",
    summary: "Entenda a condição onde a estrutura ocular é preservada, mas as áreas cerebrais de processamento visual necessitam de estimulação orientada.",
    content: `A Deficiência Visual Cortical/Cerebral (DVC) é uma das principais causas de baixa visão na infância nos países desenvolvidos e em desenvolvimento.\n\nCaracterísticas da DVC:\n- Preferência por cores específicas (frequentemente vermelho ou amarelo);\n- Latência visual (demora para processar e responder ao estímulo);\n- Necessidade de movimento para perceber objetos;\n- Dificuldade com complexidade visual no ambiente;\n- Olhar atípico ou desvio na fixação inicial.\n\nCom o plano de estimulação visual correto e estruturado, o cérebro cria novas sinapses funcionais, trazendo ganhos reais de percepção.`,
    readTime: "6 min de leitura",
    order: 3,
  }
];

// Test connection on startup
export async function testConnection(): Promise<void> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error: any) {
    if (
      error?.code === 'unavailable' ||
      error?.message?.includes('the client is offline') ||
      error?.message?.includes('Could not reach Cloud Firestore')
    ) {
      // Non-fatal transient warning while Firestore connects in background
      console.info("Firestore status: operating in resilient offline/cached mode while establishing connection.");
    }
  }
}

// Auto-seed initial content if not present
export async function ensureInitialContent(): Promise<SiteContent> {
  const contentRef = doc(db, 'siteContent', 'main');
  try {
    const snap = await getDoc(contentRef);
    if (snap.exists()) {
      return { ...DEFAULT_SITE_CONTENT, ...snap.data() } as SiteContent;
    } else {
      // Create initial doc
      await setDoc(contentRef, {
        ...DEFAULT_SITE_CONTENT,
        updatedAt: new Date().toISOString(),
      });
      return DEFAULT_SITE_CONTENT;
    }
  } catch (err) {
    console.warn("Could not fetch siteContent from Firestore, using defaults:", err);
    return DEFAULT_SITE_CONTENT;
  }
}

export async function updateSiteContent(data: Partial<SiteContent>): Promise<void> {
  const contentRef = doc(db, 'siteContent', 'main');
  try {
    await setDoc(contentRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, 'siteContent/main');
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const colRef = collection(db, 'testimonials');
    const snap = await getDocs(colRef);
    if (snap.empty) {
      return DEFAULT_TESTIMONIALS;
    }
    const list: Testimonial[] = [];
    snap.forEach((d) => {
      list.push({ id: d.id, ...d.data() } as Testimonial);
    });
    return list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  } catch (error) {
    console.warn("Using default testimonials due to read error/fallback:", error);
    return DEFAULT_TESTIMONIALS;
  }
}

export async function addTestimonial(item: Omit<Testimonial, 'id'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'testimonials'), {
      ...item,
      createdAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'testimonials');
    return '';
  }
}

export async function updateTestimonial(id: string, item: Partial<Testimonial>): Promise<void> {
  try {
    await updateDoc(doc(db, 'testimonials', id), {
      ...item,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `testimonials/${id}`);
  }
}

export async function deleteTestimonial(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'testimonials', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `testimonials/${id}`);
  }
}

export async function submitAppointment(data: Omit<Appointment, 'id' | 'status' | 'createdAt'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'appointments'), {
      ...data,
      status: 'new',
      createdAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'appointments');
    return '';
  }
}

export async function getAppointments(): Promise<Appointment[]> {
  try {
    const colRef = collection(db, 'appointments');
    const snap = await getDocs(colRef);
    const list: Appointment[] = [];
    snap.forEach((d) => {
      list.push({ id: d.id, ...d.data() } as Appointment);
    });
    return list.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'appointments');
    return [];
  }
}

export async function updateAppointmentStatus(id: string, status: Appointment['status']): Promise<void> {
  try {
    await updateDoc(doc(db, 'appointments', id), { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `appointments/${id}`);
  }
}

export async function deleteAppointment(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'appointments', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `appointments/${id}`);
  }
}

export const ADMIN_MASTER_EMAIL = "admin@x.com";
export const ADMIN_MASTER_PASS = "admin4321";

export interface AdminSession {
  email: string;
  uid: string;
  displayName: string;
  authenticated: boolean;
}

export function getStoredAdminSession(): AdminSession | null {
  try {
    const raw = sessionStorage.getItem('darlene_admin_session');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.authenticated && parsed.email === ADMIN_MASTER_EMAIL) {
      return {
        email: ADMIN_MASTER_EMAIL,
        uid: 'master-admin',
        displayName: 'Administrador Darlene Kloster',
        authenticated: true,
      };
    }
    return null;
  } catch {
    return null;
  }
}

// Authentication helper for admin credentials
export async function loginAdmin(emailInput: string, passInput: string): Promise<User | AdminSession> {
  const normalizedEmail = emailInput.trim().toLowerCase();
  const pass = passInput.trim();

  // 1. Check official master admin credentials (admin@x.com / admin4321)
  if (normalizedEmail === ADMIN_MASTER_EMAIL && pass === ADMIN_MASTER_PASS) {
    const adminSession: AdminSession = {
      email: ADMIN_MASTER_EMAIL,
      uid: 'master-admin',
      displayName: 'Administrador Darlene Kloster',
      authenticated: true,
    };
    sessionStorage.setItem('darlene_admin_session', JSON.stringify(adminSession));

    // Also attempt Firebase Auth in the background if possible, non-blocking
    try {
      await signInWithEmailAndPassword(auth, normalizedEmail, pass);
    } catch {
      try {
        await createUserWithEmailAndPassword(auth, normalizedEmail, pass);
      } catch {
        // Firebase provider not required since direct admin session is already active and verified
      }
    }

    return adminSession;
  }

  // 2. Otherwise try Firebase Auth standard sign-in
  try {
    const cred = await signInWithEmailAndPassword(auth, normalizedEmail, pass);
    sessionStorage.setItem('darlene_admin_session', JSON.stringify({
      email: cred.user.email,
      uid: cred.user.uid,
      displayName: cred.user.displayName || cred.user.email,
      authenticated: true,
    }));
    return cred.user;
  } catch (err: any) {
    if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
      try {
        const newCred = await createUserWithEmailAndPassword(auth, normalizedEmail, pass);
        return newCred.user;
      } catch {
        throw new Error("E-mail ou senha incorretos.");
      }
    }
    throw new Error("E-mail ou senha incorretos.");
  }
}

export async function loginWithGoogle(): Promise<User> {
  const provider = new GoogleAuthProvider();
  const res = await signInWithPopup(auth, provider);
  sessionStorage.setItem('darlene_admin_session', JSON.stringify({
    email: res.user.email,
    uid: res.user.uid,
    displayName: res.user.displayName || res.user.email,
    authenticated: true,
  }));
  return res.user;
}

export async function logoutAdmin(): Promise<void> {
  sessionStorage.removeItem('darlene_admin_session');
  try {
    await signOut(auth);
  } catch (e) {
    console.warn("Sign out err:", e);
  }
}
