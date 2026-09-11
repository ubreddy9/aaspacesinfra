import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Shield, Eye, EyeOff, Lock } from 'lucide-react';
import { loginAdmin, checkAdminAuth } from '@/lib/projectStore';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (checkAdminAuth()) navigate('/admin/projects');
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    await new Promise((r) => setTimeout(r, 600)); // Artificial delay
    const ok = loginAdmin(pin);
    if (ok) {
      navigate('/admin/projects');
    } else {
      setError('Incorrect PIN. Please try again.');
      setPin('');
    }
    setLoading(false);
  }

  return (
    <>
      <Helmet>
        <title>Admin Login | AA Spaces</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div
        className="min-h-screen flex items-center justify-center p-4 steel-grid"
        style={{ background: 'hsl(215 40% 7%)' }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'hsl(20 62% 38% / 0.08)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }}
        />

        <form
          onSubmit={handleSubmit}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 420,
            background: 'hsl(215 35% 12%)',
            backdropFilter: 'blur(24px)',
            border: '1px solid hsl(0 0% 100% / 0.08)',
            borderRadius: 24,
            padding: '2.5rem',
            boxShadow: '0 32px 64px hsl(0 0% 0% / 0.4)',
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: 56, height: 56,
              borderRadius: 16,
              background: 'hsl(20 62% 38% / 0.2)',
              border: '1px solid hsl(20 62% 38% / 0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 24,
            }}
          >
            <Shield size={26} color="hsl(28 95% 58%)" />
          </div>

          <h1
            style={{
              fontFamily: '"Sora", sans-serif',
              fontSize: '1.75rem',
              color: '#fff',
              marginBottom: 8,
            }}
          >
            Admin Access
          </h1>
          <p style={{ fontSize: 14, color: 'hsl(0 0% 100% / 0.5)', marginBottom: 32 }}>
            Enter your PIN to manage projects and content.
          </p>

          {/* PIN input */}
          <div style={{ marginBottom: 20 }}>
            <label
              htmlFor="pin"
              style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'hsl(28 95% 58%)', marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              Access PIN
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={16}
                style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'hsl(0 0% 100% / 0.3)' }}
              />
              <input
                id="pin"
                type={showPin ? 'text' : 'password'}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN"
                autoComplete="current-password"
                required
                style={{
                  width: '100%',
                  background: 'hsl(0 0% 100% / 0.05)',
                  border: error ? '1px solid hsl(0 84% 60% / 0.6)' : '1px solid hsl(0 0% 100% / 0.1)',
                  borderRadius: 12,
                  padding: '12px 44px 12px 40px',
                  fontSize: 15,
                  color: '#fff',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'hsl(37 65% 57% / 0.6)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = error ? 'hsl(0 84% 60% / 0.6)' : 'hsl(0 0% 100% / 0.1)'; }}
              />
              <button
                type="button"
                onClick={() => setShowPin((v) => !v)}
                style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: 'hsl(0 0% 100% / 0.4)',
                  padding: 4,
                }}
              >
                {showPin ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && (
              <p style={{ marginTop: 8, fontSize: 13, color: 'hsl(0 84% 60%)' }}>{error}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !pin}
            style={{
              width: '100%',
              padding: '13px',
              borderRadius: 12,
              background: loading ? 'hsl(20 62% 38% / 0.5)' : 'hsl(215 72% 18%)',
              color: '#fff',
              fontSize: 15,
              fontWeight: 700,
              border: 'none',
              cursor: loading || !pin ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            {loading ? (
              <>
                <span style={{ width: 16, height: 16, border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                Verifying…
              </>
            ) : (
              'Enter Admin Panel'
            )}
          </button>

          <p style={{ marginTop: 24, textAlign: 'center', fontSize: 12, color: 'hsl(0 0% 100% / 0.25)' }}>
            Default PIN: <code style={{ color: 'hsl(0 0% 100% / 0.4)' }}>admin2024</code>
          </p>
        </form>
      </div>
    </>
  );
}

