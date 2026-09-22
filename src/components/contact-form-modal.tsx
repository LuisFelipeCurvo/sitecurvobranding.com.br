"use client";

import { useEffect, useId, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { buildWhatsappUrl } from "@/lib/contact";
import {
  onOpenContactForm,
  REVENUE_OPTIONS,
  STAGE_OPTIONS,
} from "@/lib/contact-form";
import { cn } from "@/lib/utils";

const STEPS = ["intro", "contact", "segment", "stage", "revenue", "done"] as const;
type Step = (typeof STEPS)[number];

// passos que contam pro indicador "Pergunta X de Y" (intro/done ficam de fora)
const QUESTION_STEPS: Step[] = ["contact", "segment", "stage", "revenue"];

const EMPTY_FORM = {
  name: "",
  whatsapp: "",
  email: "",
  segment: "",
  stage: "",
  revenue: "",
};

/**
 * Modal de contato próprio do site — substitui o popup do Tally (mesmas
 * perguntas), sem depender de um serviço externo. Fica montado uma vez em
 * layout.tsx e abre via `openContactForm()` (src/lib/contact-form.ts).
 * No fim, monta a mensagem com as respostas e manda pro WhatsApp.
 */
export function ContactFormModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("intro");
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => onOpenContactForm(() => setOpen(true)), []);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      // reseta depois da animação de saída, pra não "piscar" o form vazio
      window.setTimeout(() => {
        setStep("intro");
        setForm(EMPTY_FORM);
      }, 200);
    }
  }

  function goTo(next: Step) {
    setStep(next);
  }

  function stepIndex(target: Step) {
    return STEPS.indexOf(target);
  }

  function next() {
    goTo(STEPS[stepIndex(step) + 1]);
  }

  function back() {
    goTo(STEPS[stepIndex(step) - 1]);
  }

  function isStepValid() {
    switch (step) {
      case "contact":
        return (
          form.name.trim() !== "" &&
          form.whatsapp.trim() !== "" &&
          /\S+@\S+\.\S+/.test(form.email)
        );
      case "segment":
        return form.segment.trim() !== "";
      case "stage":
        return form.stage !== "";
      case "revenue":
        return form.revenue !== "";
      default:
        return true;
    }
  }

  function handleSubmitStep(e: React.FormEvent) {
    e.preventDefault();
    if (!isStepValid()) return;
    next();
  }

  function sendToWhatsapp() {
    const stageLabel = STAGE_OPTIONS.find((o) => o.value === form.stage)?.label;
    const revenueLabel = REVENUE_OPTIONS.find(
      (o) => o.value === form.revenue,
    )?.label;

    const message = [
      "Olá! Vim pelo site da Curvo Branding e quero entender melhor como funciona.",
      "",
      `Nome: ${form.name}`,
      `WhatsApp: ${form.whatsapp}`,
      `E-mail: ${form.email}`,
      `Segmento do negócio/marca: ${form.segment}`,
      `Estágio do negócio: ${stageLabel}`,
      `Faturamento esperado (12 meses): ${revenueLabel}`,
    ].join("\n");

    window.location.href = buildWhatsappUrl(message);
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[70] bg-ghost/50 transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="fixed inset-0 z-[70] flex items-center justify-center p-6 outline-none">
          <div
            className={cn(
              "relative flex w-full max-w-md flex-col gap-8 border border-ash/25 bg-obsidian p-7 text-ghost shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] transition-all duration-200 sm:p-9",
              "data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            )}
          >
            <Dialog.Close className="absolute right-5 top-5 text-ash/70 transition-colors hover:text-ghost">
              <X className="size-5" strokeWidth={1.25} />
              <span className="sr-only">Fechar</span>
            </Dialog.Close>

            {step !== "intro" && step !== "done" && (
              <span className="text-[11px] uppercase tracking-[0.16em] text-ash">
                Pergunta {QUESTION_STEPS.indexOf(step) + 1} de{" "}
                {QUESTION_STEPS.length}
              </span>
            )}

            {step === "intro" && (
              <IntroStep onStart={next} />
            )}

            {step === "contact" && (
              <ContactStep
                form={form}
                setForm={setForm}
                onBack={back}
                onSubmit={handleSubmitStep}
                valid={isStepValid()}
              />
            )}

            {step === "segment" && (
              <SegmentStep
                value={form.segment}
                onChange={(segment) => setForm((f) => ({ ...f, segment }))}
                onBack={back}
                onSubmit={handleSubmitStep}
                valid={isStepValid()}
              />
            )}

            {step === "stage" && (
              <ChoiceStep
                question="Em qual estágio está o seu negócio/marca?"
                options={STAGE_OPTIONS}
                value={form.stage}
                onChange={(stage) => setForm((f) => ({ ...f, stage }))}
                onBack={back}
                onSubmit={handleSubmitStep}
                valid={isStepValid()}
              />
            )}

            {step === "revenue" && (
              <ChoiceStep
                question="Qual a expectativa de faturamento deste negócio para os próximos 12 meses?"
                options={REVENUE_OPTIONS}
                value={form.revenue}
                onChange={(revenue) => setForm((f) => ({ ...f, revenue }))}
                onBack={back}
                onSubmit={handleSubmitStep}
                valid={isStepValid()}
                lastQuestion
              />
            )}

            {step === "done" && <DoneStep onSubmit={sendToWhatsapp} />}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function PrimaryButton(props: React.ComponentProps<"button">) {
  const { className, ...rest } = props;
  return (
    <button
      type="submit"
      className={cn(
        "bg-ghost px-8 py-4 text-center text-xs uppercase tracking-[0.16em] text-obsidian transition-opacity duration-200 hover:opacity-90 focus-visible:outline-obsidian disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
      {...rest}
    />
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="self-start text-[11px] uppercase tracking-[0.14em] text-ash transition-colors hover:text-ghost"
    >
      Voltar
    </button>
  );
}

function IntroStep({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-black uppercase tracking-[-0.01em]">
          Formulário de Contato
        </h2>
        <p className="text-sm leading-[1.6] text-ash">
          Se você busca alinhar a comunicação da sua marca e tornar-se uma
          referência no seu mercado, preencha em 30 segundos essa aplicação
          para podermos te direcionar da melhor forma!
        </p>
      </div>
      <PrimaryButton type="button" onClick={onStart} className="self-start">
        Começar
      </PrimaryButton>
    </div>
  );
}

function ContactStep({
  form,
  setForm,
  onBack,
  onSubmit,
  valid,
}: {
  form: typeof EMPTY_FORM;
  setForm: React.Dispatch<React.SetStateAction<typeof EMPTY_FORM>>;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
  valid: boolean;
}) {
  const nameId = useId();
  const whatsappId = useId();
  const emailId = useId();

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <h2 className="text-lg font-black uppercase tracking-[-0.01em]">
        Antes de tudo...
      </h2>
      <div className="flex flex-col gap-5">
        <FormField label="Qual é o seu nome?" htmlFor={nameId}>
          <input
            id={nameId}
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className={INPUT_CLASS}
          />
        </FormField>
        <FormField label="Seu WhatsApp" htmlFor={whatsappId}>
          <input
            id={whatsappId}
            type="tel"
            required
            value={form.whatsapp}
            onChange={(e) =>
              setForm((f) => ({ ...f, whatsapp: e.target.value }))
            }
            className={INPUT_CLASS}
          />
        </FormField>
        <FormField label="Seu melhor e-mail" htmlFor={emailId}>
          <input
            id={emailId}
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={INPUT_CLASS}
          />
        </FormField>
      </div>
      <StepActions onBack={onBack} valid={valid} />
    </form>
  );
}

function SegmentStep({
  value,
  onChange,
  onBack,
  onSubmit,
  valid,
}: {
  value: string;
  onChange: (v: string) => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
  valid: boolean;
}) {
  const id = useId();
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <FormField
        label="Qual o segmento do seu negócio/marca?"
        htmlFor={id}
        hint="Ex: moda, saúde, tecnologia, alimentos, varejo, educação, etc."
      >
        <input
          id={id}
          type="text"
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={INPUT_CLASS}
        />
      </FormField>
      <StepActions onBack={onBack} valid={valid} />
    </form>
  );
}

function ChoiceStep({
  question,
  options,
  value,
  onChange,
  onBack,
  onSubmit,
  valid,
  lastQuestion,
}: {
  question: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  value: string;
  onChange: (v: string) => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
  valid: boolean;
  lastQuestion?: boolean;
}) {
  const name = useId();
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <h2 className="text-base font-black uppercase leading-snug tracking-[-0.01em]">
        {question}
      </h2>
      <div className="flex flex-col gap-2.5" role="radiogroup">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-3 border border-ash/30 px-4 py-3 text-sm transition-colors has-[:checked]:border-ghost has-[:checked]:bg-ghost/[0.04] hover:border-ghost/60"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="size-4 accent-ghost"
            />
            {option.label}
          </label>
        ))}
      </div>
      <StepActions onBack={onBack} valid={valid} lastQuestion={lastQuestion} />
    </form>
  );
}

function DoneStep({ onSubmit }: { onSubmit: () => void }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-black uppercase tracking-[-0.01em]">
          Obrigado!!
        </h2>
        <p className="text-sm leading-[1.6] text-ash">
          Todas as informações fornecidas serão mantidas em sigilo e
          utilizadas exclusivamente para fins internos de análise e
          aprimoramento.
        </p>
        <p className="text-sm leading-[1.6] text-ash">
          Clique no botão abaixo e fale conosco!
        </p>
      </div>
      <PrimaryButton type="button" onClick={onSubmit} className="self-start">
        Entrar em Contato
      </PrimaryButton>
    </div>
  );
}

function StepActions({
  onBack,
  valid,
  lastQuestion,
}: {
  onBack: () => void;
  valid: boolean;
  lastQuestion?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <BackButton onClick={onBack} />
      <PrimaryButton disabled={!valid}>
        {lastQuestion ? "Ver contato" : "Próximo"}
      </PrimaryButton>
    </div>
  );
}

function FormField({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="text-sm font-black uppercase leading-snug tracking-[-0.01em]"
      >
        {label}
      </label>
      {hint && <p className="text-xs text-ash">{hint}</p>}
      {children}
    </div>
  );
}

const INPUT_CLASS =
  "border-b border-ash/40 bg-transparent py-2 text-sm text-ghost placeholder:text-ash/60 focus:border-ghost focus:outline-none";
