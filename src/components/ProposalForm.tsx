import { useState, type FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function ProposalForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    if (formData.get('_gotcha')) return;

    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const projectType = String(formData.get('projectType') ?? '').trim();
    const location = String(formData.get('location') ?? '').trim();
    const scale = String(formData.get('scale') ?? '').trim();
    const timeline = String(formData.get('timeline') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    setStatus('sending');
    setErrorMsg('');
    try {
      // Field mapping: only the message textarea goes in messages_attributes[0].body.
      // All other fields (dropdowns, radios, checkboxes) must be added to conversation.data as { "Label": value } pairs.
      const response = await fetch('/api/contact/proposal-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversation: {
            messages_attributes: [{ body: message || 'New proposal request submission' }],
            data: {
              __gd_contact_form_title: 'Request a proposal',
              'Project type': projectType,
              'Site location': location,
              'Phone number': phone,
              'Indicative scale': scale,
              'Project timeline': timeline,
            },
          },
          user: { email, name },
        }),
      });
      const json = await response.json();
      if (!json.success) throw new Error(json.error || 'Something went wrong.');
      form.reset();
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMsg(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  }

  if (status === 'success') return <div className="border border-primary bg-muted p-7" role="status"><p className="text-xs font-bold tracking-[0.14em] text-primary">Brief received</p><p className="mt-3 text-2xl tracking-[-0.02em]">Thank you. AA Spaces will review your project context and be in touch.</p><button type="button" onClick={() => setStatus('idle')} className="mt-6 border-b border-primary pb-1 text-sm font-bold text-primary">Submit another brief</button></div>;

  const inputClass = 'mt-2 w-full border-b border-border bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-primary';
  const labelClass = 'text-xs font-bold tracking-[0.1em] text-foreground';
  return <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-x-7 gap-y-7 sm:grid-cols-2">
    <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px]" aria-hidden="true" />
    <label className={labelClass}>Your name<input className={inputClass} name="name" required autoComplete="name" /></label>
    <label className={labelClass}>Email address<input className={inputClass} name="email" type="email" required autoComplete="email" /></label>
    <label className={labelClass}>Phone number<input className={inputClass} name="phone" type="tel" required autoComplete="tel" /></label>
    <label className={labelClass}>Project type<select className={inputClass} name="projectType" required defaultValue=""><option value="" disabled>Select a sector</option><option>Warehouse</option><option>Commercial establishment</option><option>Hospitality structure</option><option>Industrial structure</option><option>Convention center</option><option>Other</option></select></label>
    <label className={labelClass}>Site location<input className={inputClass} name="location" required placeholder="City, state" /></label>
    <label className={labelClass}>Indicative scale<input className={inputClass} name="scale" required placeholder="Area, height, span, or brief" /></label>
    <label className={labelClass}>Target timeline<select className={inputClass} name="timeline" required defaultValue=""><option value="" disabled>Select a timeline</option><option>Exploring requirements</option><option>Within 3 months</option><option>3–6 months</option><option>6–12 months</option><option>More than 12 months</option></select></label>
    <label className={`sm:col-span-2 ${labelClass}`}>Tell us about the project<textarea className={`${inputClass} min-h-32 resize-y`} name="message" required placeholder="Share the use case, site context, and any requirements already in view." /></label>
    {status === 'error' && <p className="sm:col-span-2 text-sm text-destructive" role="alert">{errorMsg}</p>}
    <div className="sm:col-span-2"><button type="submit" disabled={status === 'sending'} className="inline-flex items-center gap-3 bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70">{status === 'sending' ? 'Sending brief...' : 'Send project brief'}<ArrowUpRight size={17} /></button></div>
  </form>;
}
