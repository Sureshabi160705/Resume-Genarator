import React, { useEffect, useState } from 'react';
import { AuthForm } from './components/AuthForm';
import { ResumeForm } from './components/ResumeForm';
import { supabase } from './lib/supabase';
import { ResumeData } from './types';
import { LogOut } from 'lucide-react';

function App() {
  const [session, setSession] = useState(null);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchResumeData(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchResumeData(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchResumeData = async (userId: string) => {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching resume:', error);
      return;
    }

    setResumeData(data);
  };

  const handleSaveResume = async (data: ResumeData) => {
    if (!session) return;

    const { error } = await supabase.from('resumes').upsert({
      user_id: session.user.id,
      ...data,
    });

    if (error) {
      console.error('Error saving resume:', error);
      return;
    }

    alert('Resume saved successfully!');
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setResumeData(null);
  };

  if (!session) {
    return <AuthForm onSuccess={() => {}} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-gray-900">Resume Builder</h1>
            <button
              onClick={handleSignOut}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </nav>
      <ResumeForm initialData={resumeData} onSave={handleSaveResume} />
    </div>
  );
}

export default App;