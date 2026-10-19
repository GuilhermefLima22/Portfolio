import React, { useState } from 'react';
import type { Project } from '../types';
import { X, Terminal, BarChart3, CheckCircle2, Send, Workflow, Sparkles, Activity, ShieldCheck, MessageSquare, Users, Code2, Copy, Check } from 'lucide-react';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const isDentinho = project.id === 'dentinho';
  const isPortuguinha = project.id === 'portuguinha';
  const hasCode = Boolean(project.codeSnippet);
  const [activeTab, setActiveTab] = useState<'overview' | 'terminal' | 'dashboard' | 'media' | 'image' | 'workflow' | 'code'>(
    isDentinho ? 'terminal' : isPortuguinha ? 'workflow' : hasCode ? 'code' : 'overview'
  );
  const [copiedCode, setCopiedCode] = useState(false);

  // Estados interativos para simular o Terminal do Dentinho
  const [terminalTab, setTerminalTab] = useState<'treinar' | 'teste'>('treinar');
  const [instrucao, setInstrucao] = useState('');
  const [terminalFeedbacks, setTerminalFeedbacks] = useState<string[]>([]);
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([
    { sender: 'user', text: 'Olá, qual o horário de funcionamento e convênios aceitos?' },
    { sender: 'bot', text: 'Olá! Nosso atendimento é de segunda a sexta das 08h às 19h e aos sábados até às 13h. Aceitamos os principais convênios da região ou avaliação particular!' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Estados interativos para simular o Painel de Pedidos/Atendimentos (Recepção)
  const [painelMenu, setPainelMenu] = useState<'atendimentos' | 'graficos' | 'relatorios'>('atendimentos');
  const [painelFiltro, setPainelFiltro] = useState<'todos' | 'urgencias' | 'pendentes' | 'confirmados'>('todos');

  const handleEnviarInstrucao = (e: React.FormEvent) => {
    e.preventDefault();
    if (!instrucao.trim()) return;
    setTerminalFeedbacks(prev => [
      `Diretriz recebida: "${instrucao}" → Atualizando contexto do Gemini 3.8 Flash e gravando backup... [OK]`,
      ...prev
    ]);
    setInstrucao('');
  };

  const handleEnviarChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const msg = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: msg }]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: `[Gemini 3.8 Flash]: Entendi perfeitamente sua mensagem sobre "${msg}". O agendamento foi registrado e notificado no painel da clínica!`
        }
      ]);
    }, 600);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-2.5 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl max-h-[94vh] sm:max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-ink-900 border border-white/10 shadow-2xl p-4 sm:p-8 text-paper"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-5 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-signal/10 text-signal border border-signal/30 font-medium">
                {project.status}
              </span>
              <span className="font-mono text-xs text-muted">
                {project.category.toUpperCase()}
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-paper">
              {project.title}
            </h2>
            <p className="font-mono text-xs sm:text-sm text-signal mt-1">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/[0.05] hover:bg-white/15 text-paper/80 hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs */}
        {isDentinho ? (
          <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-white/[0.08] pb-4">
            <button
              onClick={() => setActiveTab('terminal')}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs flex items-center gap-2 transition-all ${
                activeTab === 'terminal'
                  ? 'bg-signal text-ink-950 font-bold shadow-[0_0_15px_rgba(198,255,61,0.25)]'
                  : 'bg-white/[0.03] text-paper/70 hover:text-paper border border-white/[0.05]'
              }`}
            >
              <Terminal className="w-4 h-4" />
              Terminal do Dentinho (Interativo)
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs flex items-center gap-2 transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-signal text-ink-950 font-bold shadow-[0_0_15px_rgba(198,255,61,0.25)]'
                  : 'bg-white/[0.03] text-paper/70 hover:text-paper border border-white/[0.05]'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Painel de Atendimentos & API
            </button>

            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs transition-all ${
                activeTab === 'overview'
                  ? 'bg-signal text-ink-950 font-bold'
                  : 'bg-white/[0.03] text-paper/70 hover:text-paper border border-white/[0.05]'
              }`}
            >
              Arquitetura & Detalhes
            </button>
          </div>
        ) : isPortuguinha ? (
          <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-white/[0.08] pb-4">
            <button
              onClick={() => setActiveTab('workflow')}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs flex items-center gap-2 transition-all ${
                activeTab === 'workflow'
                  ? 'bg-signal text-ink-950 font-bold shadow-[0_0_15px_rgba(198,255,61,0.25)]'
                  : 'bg-white/[0.03] text-paper/70 hover:text-paper border border-white/[0.05]'
              }`}
            >
              <Workflow className="w-4 h-4" />
              Workflow n8n & IA (5 Módulos)
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs flex items-center gap-2 transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-signal text-ink-950 font-bold shadow-[0_0_15px_rgba(198,255,61,0.25)]'
                  : 'bg-white/[0.03] text-paper/70 hover:text-paper border border-white/[0.05]'
              }`}
            >
              <Activity className="w-4 h-4" />
              Painel Evolution API (Conectado)
            </button>

            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs transition-all ${
                activeTab === 'overview'
                  ? 'bg-signal text-ink-950 font-bold'
                  : 'bg-white/[0.03] text-paper/70 hover:text-paper border border-white/[0.05]'
              }`}
            >
              Arquitetura & Detalhes
            </button>
          </div>
        ) : hasCode && project.codeSnippet ? (
          <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-white/[0.08] pb-4">
            <button
              onClick={() => setActiveTab('code')}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs flex items-center gap-2 transition-all ${
                activeTab === 'code'
                  ? 'bg-signal text-ink-950 font-bold shadow-[0_0_15px_rgba(198,255,61,0.25)]'
                  : 'bg-white/[0.03] text-paper/70 hover:text-paper border border-white/[0.05]'
              }`}
            >
              <Code2 className="w-4 h-4" />
              Código-Fonte ({project.codeSnippet.filename})
            </button>

            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs transition-all ${
                activeTab === 'overview'
                  ? 'bg-signal text-ink-950 font-bold'
                  : 'bg-white/[0.03] text-paper/70 hover:text-paper border border-white/[0.05]'
              }`}
            >
              Arquitetura & Detalhes
            </button>
          </div>
        ) : null}

        {/* ========================================================================= */}
        {/* ABA: TERMINAL DO DENTINHO (INTERATIVO COM PRINT REAL)                     */}
        {/* ========================================================================= */}
        {activeTab === 'terminal' && isDentinho && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Imagem Real do Terminal de Controle */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#06080F] shadow-xl">
              <div className="px-4 py-2.5 bg-ink-950 border-b border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-muted">
                <span>Captura de Tela Real • Terminal do Dentinho AI Studio v2.0</span>
                <span className="text-signal flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
                  Ambiente em Produção
                </span>
              </div>
              <div className="p-2 sm:p-3 bg-black/40 flex items-center justify-center">
                <img 
                  src="/dentinho/terminal_controle.png" 
                  alt="Terminal do Dentinho" 
                  className="w-full h-auto object-contain rounded-xl shadow-md"
                />
              </div>
            </div>

            {/* Simulador Interativo do Terminal */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#090D16] border border-cyan-500/30 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <button
                    onClick={() => setTerminalTab('treinar')}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                      terminalTab === 'treinar'
                        ? 'bg-cyan-500 text-ink-950 font-bold'
                        : 'bg-white/[0.05] text-paper/70 hover:text-paper'
                    }`}
                  >
                    🧠 Treinar Cérebro (IA)
                  </button>
                  <button
                    onClick={() => setTerminalTab('teste')}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                      terminalTab === 'teste'
                        ? 'bg-cyan-500 text-ink-950 font-bold'
                        : 'bg-white/[0.05] text-paper/70 hover:text-paper'
                    }`}
                  >
                    💬 Teste de Conversa ao Vivo
                  </button>
                </div>
                <span className="text-xs font-mono text-cyan-400">
                  Experimente alternar as abas abaixo:
                </span>
              </div>

              {terminalTab === 'treinar' ? (
                <div className="space-y-4 font-mono text-xs">
                  <p className="text-paper/80">
                    <strong>Engenharia de Prompt & Diretrizes:</strong> Digite uma instrução para simular o ajuste de comportamento em tempo real do Gemini 3.8 Flash:
                  </p>
                  <form onSubmit={handleEnviarInstrucao} className="flex gap-2">
                    <input 
                      type="text" 
                      value={instrucao}
                      onChange={(e) => setInstrucao(e.target.value)}
                      placeholder="Ex: 'Seja mais direto ao falar de valores' ou 'Avise que sábado fecha às 13h'"
                      className="flex-1 bg-ink-950 border border-white/10 rounded-xl px-4 py-2.5 text-paper placeholder:text-muted/60 focus:outline-none focus:border-cyan-400"
                    />
                    <button 
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-cyan-500 text-ink-950 font-bold flex items-center gap-1 hover:bg-cyan-400 transition-colors"
                    >
                      Enviar 🚀
                    </button>
                  </form>

                  {terminalFeedbacks.length > 0 && (
                    <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 space-y-1 text-cyan-300">
                      {terminalFeedbacks.map((fb, idx) => (
                        <div key={idx}>✔ {fb}</div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4 font-mono text-xs">
                  <div className="max-h-48 overflow-y-auto space-y-2 p-3 rounded-xl bg-ink-950 border border-white/[0.06]">
                    {chatMessages.map((msg, idx) => (
                      <div 
                        key={idx} 
                        className={`p-2.5 rounded-lg max-w-[85%] ${
                          msg.sender === 'user'
                            ? 'ml-auto bg-cyan-500/20 text-cyan-200 border border-cyan-500/30'
                            : 'mr-auto bg-white/[0.04] text-paper/90 border border-white/[0.06]'
                        }`}
                      >
                        <span className="block text-[10px] text-muted mb-0.5">
                          {msg.sender === 'user' ? 'Você (WhatsApp Cliente)' : 'Dentinho (Gemini 3.8 Flash)'}
                        </span>
                        {msg.text}
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleEnviarChat} className="flex gap-2">
                    <input 
                      type="text" 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Simule uma dúvida ou pedido pelo WhatsApp..."
                      className="flex-1 bg-ink-950 border border-white/10 rounded-xl px-4 py-2 text-paper placeholder:text-muted/60 focus:outline-none focus:border-cyan-400"
                    />
                    <button 
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-cyan-500 text-ink-950 font-bold flex items-center gap-1 hover:bg-cyan-400 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ABA: PAINEL DE PEDIDOS & ATENDIMENTOS (INTERATIVO COM PRINT REAL)         */}
        {/* ========================================================================= */}
        {activeTab === 'dashboard' && isDentinho && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Imagem Real do Painel de Atendimentos */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#06080F] shadow-xl">
              <div className="px-4 py-2.5 bg-ink-950 border-b border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-muted">
                <span>Captura de Tela Real • Painel Administrativo de Atendimentos & Recepção</span>
                <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Dentinho Ativo
                </span>
              </div>
              <div className="p-2 sm:p-3 bg-black/40 flex items-center justify-center">
                <img 
                  src="/dentinho/painel_pedidos.png" 
                  alt="Painel de Atendimentos e Pedidos" 
                  className="w-full h-auto object-contain rounded-xl shadow-md"
                />
              </div>
            </div>

            {/* Simulador Interativo de Abas do Painel */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-emerald-500/30 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  <button
                    onClick={() => setPainelMenu('atendimentos')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      painelMenu === 'atendimentos'
                        ? 'bg-emerald-500 text-ink-950 font-bold'
                        : 'bg-white/[0.05] text-paper/70 hover:text-paper'
                    }`}
                  >
                    📅 Atendimentos
                  </button>
                  <button
                    onClick={() => setPainelMenu('graficos')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      painelMenu === 'graficos'
                        ? 'bg-emerald-500 text-ink-950 font-bold'
                        : 'bg-white/[0.05] text-paper/70 hover:text-paper'
                    }`}
                  >
                    📈 Gráficos Mensais
                  </button>
                  <button
                    onClick={() => setPainelMenu('relatorios')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      painelMenu === 'relatorios'
                        ? 'bg-emerald-500 text-ink-950 font-bold'
                        : 'bg-white/[0.05] text-paper/70 hover:text-paper'
                    }`}
                  >
                    📑 Relatórios
                  </button>
                </div>

                <span className="text-xs font-mono text-emerald-400">
                  Alterne os módulos do painel acima 👆
                </span>
              </div>

              {painelMenu === 'atendimentos' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    {(['todos', 'urgencias', 'pendentes', 'confirmados'] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setPainelFiltro(f)}
                        className={`px-3 py-1 rounded-full capitalize transition-colors ${
                          painelFiltro === f
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                            : 'bg-white/[0.04] text-muted hover:text-paper'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>

                  <div className="p-8 rounded-xl bg-ink-950/80 border border-white/[0.05] text-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                      ✔
                    </div>
                    <div className="font-display font-semibold text-paper text-sm">
                      Filtro selecionado: {painelFiltro.toUpperCase()}
                    </div>
                    <p className="text-xs text-muted max-w-sm mx-auto">
                      A fila de atendimento é sincronizada automaticamente com o banco relacional SQLite quando novos clientes interagem no WhatsApp.
                    </p>
                  </div>
                </div>
              )}

              {painelMenu === 'graficos' && (
                <div className="space-y-4">
                  <div className="p-5 rounded-xl bg-ink-950/80 border border-white/[0.05] space-y-3">
                    <div className="flex justify-between text-xs font-mono text-muted">
                      <span>Crescimento de Pedidos e Consultas (Últimos Meses)</span>
                      <span className="text-emerald-400 font-bold">+38% conversão</span>
                    </div>

                    {/* Bar visualization */}
                    <div className="grid grid-cols-4 gap-2 items-end h-28 pt-4 border-b border-white/[0.06] pb-2">
                      <div className="flex flex-col items-center gap-1.5 h-full justify-end font-mono text-[10px]">
                        <span className="text-muted">45</span>
                        <div className="w-full bg-white/10 rounded-t h-[35%]" />
                        <span className="text-muted">Mês 1</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5 h-full justify-end font-mono text-[10px]">
                        <span className="text-muted">78</span>
                        <div className="w-full bg-white/10 rounded-t h-[55%]" />
                        <span className="text-muted">Mês 2</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5 h-full justify-end font-mono text-[10px]">
                        <span className="text-muted">112</span>
                        <div className="w-full bg-white/10 rounded-t h-[75%]" />
                        <span className="text-muted">Mês 3</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5 h-full justify-end font-mono text-[10px]">
                        <span className="text-emerald-400 font-bold">160</span>
                        <div className="w-full bg-emerald-500 rounded-t shadow-[0_0_12px_rgba(16,185,129,0.5)] h-[95%]" />
                        <span className="text-emerald-400 font-bold">Atual</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {painelMenu === 'relatorios' && (
                <div className="p-6 rounded-xl bg-ink-950/80 border border-white/[0.05] text-xs font-mono text-muted space-y-2">
                  <div className="text-paper font-semibold">Geração de Relatórios Automatizada:</div>
                  <p>• Exportação de histórico de conversas e queixas mais frequentes</p>
                  <p>• Mapeamento de horários de maior procura para otimização da equipe</p>
                  <p>• Backup dos atendimentos e banco SQLite protegido</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ABA: PAINEL EVOLUTION API (PORTUGUINHA) COM PRINT REAL BORRADO            */}
        {/* ========================================================================= */}
        {activeTab === 'dashboard' && isPortuguinha && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Aviso de Privacidade de Dados */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-signal/10 border border-signal/25 text-xs font-mono text-paper/90">
              <ShieldCheck className="w-5 h-5 text-signal shrink-0" />
              <div>
                <span className="font-bold text-signal">Privacidade & Proteção de Dados: </span>
                <span>O número de WhatsApp da instância e a foto de perfil do lava-rápido foram devidamente desfocados e anonimizados para exibição pública no portfólio.</span>
              </div>
            </div>

            {/* Imagem Real do Painel Evolution API */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#06080F] shadow-2xl">
              <div className="px-4 py-3 bg-ink-950 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-muted">
                <span className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-signal" />
                  Captura de Tela Real • Evolution Exchange v2.3.7 • Instância: <code className="text-paper font-bold">lavarapido-bot</code>
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Status: Connected (Instância Ativa)
                </span>
              </div>

              <div className="p-2 sm:p-4 bg-[#0a0e17] flex justify-center">
                <img
                  src="/portuguinha/evolution_dashboard.png"
                  alt="Painel Evolution API - Instância Conectada do Portuguinha Lava-Rápido"
                  className="w-full rounded-xl object-contain border border-white/5 hover:scale-[1.01] transition-transform duration-300 shadow-lg"
                />
              </div>

              <div className="px-4 py-3 bg-ink-950/90 border-t border-white/[0.06] text-xs font-mono text-muted flex flex-wrap items-center justify-between gap-2">
                <span>Webhook Destination: n8n Workflow Server</span>
                <span className="text-paper/80 font-semibold">Ambiente Conteinerizado em Docker Compose</span>
              </div>
            </div>

            {/* Métricas Reais Extraídas da Produção */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs uppercase tracking-wider text-signal font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Métricas Reais de Produção (Extraídas do Painel):
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono">
                <div className="p-4 rounded-xl bg-ink-950/80 border border-white/[0.06] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-paper">321</div>
                    <div className="text-[11px] text-muted">Contatos Ativos</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-ink-950/80 border border-white/[0.06] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-paper">101</div>
                    <div className="text-[11px] text-muted">Chats Sincronizados</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-ink-950/80 border border-white/[0.06] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-signal/10 border border-signal/30 flex items-center justify-center text-signal">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-signal">1.167</div>
                    <div className="text-[11px] text-muted">Mensagens Processadas</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-ink-950/80 border border-white/[0.06] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-emerald-400">Connected</div>
                    <div className="text-[11px] text-muted">Sessão Sincronizada</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Destaques Técnicos da Evolution API */}
            <div className="p-4 sm:p-5 rounded-2xl bg-ink-950/60 border border-white/[0.06] space-y-3 font-mono text-xs">
              <div className="text-paper font-semibold flex items-center gap-2">
                <span>⚙ Papel da Evolution API na Arquitetura:</span>
              </div>
              <ul className="space-y-2 text-muted leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-signal">•</span>
                  <span><strong>Webhooks em Tempo Real:</strong> Cada mensagem recebida no WhatsApp aciona instantaneamente o webhook do n8n com payload estruturado em JSON.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-signal">•</span>
                  <span><strong>Respostas Transparentes:</strong> As respostas sintetizadas pelo modelo Gemini são enviadas de volta ao cliente sem atraso perceptível.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-signal">•</span>
                  <span><strong>Isolamento & Estabilidade:</strong> A instância opera em contêiner Docker dedicado com persistência de sessão (PostgreSQL + Redis) e scripts locais de inicialização automática.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ABA: WORKFLOW N8N (PORTUGUINHA) COM PRINT REAL                            */}
        {/* ========================================================================= */}
        {activeTab === 'workflow' && isPortuguinha && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Imagem Real do Workflow n8n */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#06080F] shadow-2xl">
              <div className="px-4 py-3 bg-ink-950 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-muted">
                <span className="flex items-center gap-2">
                  <Workflow className="w-3.5 h-3.5 text-signal" />
                  Captura de Tela Real • n8n Editor: Arquitetura Completa (5 Módulos Integrados)
                </span>
                <span className="text-signal flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
                  Projeto Finalizado • Em Uso em Lava-Rápido Real
                </span>
              </div>

              <div className="p-2 sm:p-4 bg-[#0d1117] flex justify-center">
                <img
                  src="/portuguinha/n8n_workflow.png"
                  alt="Workflow no n8n do Portuguinha com Visão Computacional, Oficina Jcar, Comando OK, Agente de IA e Travas de Segurança"
                  className="w-full rounded-xl object-contain border border-white/5 hover:scale-[1.01] transition-transform duration-300"
                />
              </div>

              <div className="px-4 py-3 bg-ink-950/90 border-t border-white/[0.06] text-xs font-mono text-muted flex flex-wrap items-center justify-between gap-2">
                <span>Stack: n8n • Gemini Vision OCR + Flash Lite • Evolution API • Google Sheets</span>
                <span className="text-paper/80 font-semibold">Docker Compose (Postgres + Redis)</span>
              </div>
            </div>

            {/* Os Módulos da Arquitetura (Correspondentes aos blocos da imagem) */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs uppercase tracking-wider text-signal font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Módulos & Regras de Negócio no n8n (Visão Executiva):
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-xl bg-ink-950/80 border border-violet-500/25 space-y-1.5">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-paper font-semibold">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.6)]" />
                      <span>1. Modo Pátio & Parceria B2B (Oficina Jcar)</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-violet-500/15 text-violet-300 border border-violet-500/30">Vision OCR + B2B</span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    Os administradores enviam uma <strong>foto do veículo</strong> e o <strong>Gemini Vision</strong> (com <em>retry</em> automático 4x) faz OCR da placa, identifica modelo/porte, deduz o serviço e puxa o histórico. Se a legenda tiver <code className="text-violet-300 font-bold">&quot;Jcar&quot;</code> ou <code className="text-violet-300 font-bold">&quot;Jeferson&quot;</code>, aplica automaticamente a <strong>tabela fixa da oficina parceira</strong> (<code className="text-paper">R$ 50</code> Hatch/Sedan, <code className="text-paper">R$ 65</code> SUV/Picape) sem precisar digitar valor e grava em <strong>aba exclusiva</strong> no Google Sheets.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-ink-950/80 border border-emerald-500/25 space-y-1.5">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-paper font-semibold">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                      <span>2. Aviso de &quot;Carro Pronto&quot; (Comando &quot;ok&quot;)</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">1 Toque</span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    Quando a lavagem termina, o administrador apenas responde (cita) a mensagem do pedido com <code className="text-emerald-300 font-bold">&quot;ok&quot;</code>. O fluxo identifica a placa na mensagem citada, atualiza o status na planilha para <strong>&quot;Pronto&quot;</strong> e dispara uma mensagem automática no WhatsApp privado do cliente avisando que o veículo já pode ser retirado.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-ink-950/80 border border-cyan-500/25 space-y-1.5">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-paper font-semibold">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                      <span>3. Recepcionista IA (Atendimento de Clientes)</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">Gemini + Tools</span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    Atende clientes no WhatsApp com <strong>Google Gemini Chat Model</strong> e memória de contexto. Informa preços por porte, coleta dados passo a passo ou de uma só vez, grava na planilha (<code className="text-paper">PedidoLava_Rapido</code>) com status <em>&quot;Em lavagem&quot;</em> e notifica o dono instantaneamente.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-ink-950/80 border border-amber-500/25 space-y-1.5">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-paper font-semibold">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                      <span>4. Administração via WhatsApp & Travas de Segurança</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">Anti-Spam & Trava Diária</span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    Comandos de Admin (<code className="text-amber-300">ativar</code>, <code className="text-amber-300">desativar</code>, <code className="text-amber-300">status</code>) controlam o bot pelo WhatsApp. Conta com <strong>3 travas de segurança</strong>: (1) <strong>Trava Diária de Inicialização</strong> (<code className="text-paper">staticData</code>) que envia o alerta de sistema online apenas no 1º boot do dia, evitando spam em reinicializações; (2) <strong>Bloqueio de placa duplicada</strong> no mesmo dia; e (3) <strong>Descarte de mensagens antigas</strong> (&gt; 5 min).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ABA: CÓDIGO-FONTE REAL (EX: TERMO EM C)                                   */}
        {/* ========================================================================= */}
        {activeTab === 'code' && project.codeSnippet && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Simulação Visual da Saída no Terminal + Legenda do Algoritmo */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-6 p-4 sm:p-5 rounded-2xl bg-[#06080F] border border-white/10 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-[11px] text-muted border-b border-white/[0.06] pb-2 mb-2">
                  <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                    <Terminal className="w-3.5 h-3.5" />
                    Saída no Terminal (Execução Real)
                  </span>
                  <span>gcc termo.c -o termo</span>
                </div>
                <pre className="text-paper/90 leading-relaxed overflow-x-auto text-[11.5px]">
{`BEM-VINDO AO WORDLE (TERMO)!
Tente adivinhar a palavra de 5 letras.

Tentativa 1/6. Digite seu palpite: termo

+-----------+
| t e r m o |
| ^ ! X X ^ |
+-----------+`}
                </pre>
              </div>

              <div className="lg:col-span-6 p-4 sm:p-5 rounded-2xl bg-ink-950/70 border border-white/[0.06] font-mono text-xs flex flex-col justify-between space-y-3">
                <div className="text-paper font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-signal" />
                  <span>Lógica de Verificação em 2 Passagens:</span>
                </div>
                <div className="space-y-2 text-[11.5px] text-muted">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold">^</span>
                    <span><strong>1ª Passagem:</strong> Letra na posição exata (<code className="text-paper">palpite[i] == palavra_secreta[i]</code>)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30 font-bold">!</span>
                    <span><strong>2ª Passagem:</strong> Letra existe na palavra em outra posição (controlada por <code className="text-paper">letras_usadas[5]</code>)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-400 border border-rose-500/30 font-bold">X</span>
                    <span><strong>Ausente:</strong> Letra não pertence à palavra secreta sorteada</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bloco do Código-Fonte Completo */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#06080F] shadow-2xl">
              <div className="px-4 py-3 bg-ink-950 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-paper font-semibold ml-1">{project.codeSnippet.filename}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.05] text-muted border border-white/10">
                    C ANSI • {project.codeSnippet.code.split('\n').length} linhas
                  </span>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(project.codeSnippet!.code);
                    setCopiedCode(true);
                    setTimeout(() => setCopiedCode(false), 2000);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-signal hover:text-ink-950 text-paper/90 border border-white/10 font-mono text-[11px] font-semibold flex items-center gap-1.5 transition-all"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Código</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 sm:p-5 overflow-x-auto max-h-[460px] overflow-y-auto font-mono text-xs leading-relaxed">
                <table className="w-full border-collapse">
                  <tbody>
                    {project.codeSnippet.code.split('\n').map((line, i) => (
                      <tr key={i} className="hover:bg-white/[0.02]">
                        <td className="select-none pr-4 text-right text-muted/40 text-[11px] w-8 align-top">
                          {i + 1}
                        </td>
                        <td className="text-paper/90 whitespace-pre">
                          {line || ' '}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ABA: VISÃO GERAL / ARQUITETURA                                            */}
        {/* ========================================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            {/* Visualização de Mídia (se houver e não for Dentinho) */}
            {project.media && project.media.length > 0 && !isDentinho && (
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-muted mb-3 flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-signal" />
                  Mídia & Captura do Fluxo
                </h4>
                <div className="space-y-4">
                  {project.media.map((med, mIdx) => (
                    <div key={mIdx} className="rounded-2xl overflow-hidden border border-white/10 bg-[#06080F]">
                      {med.imageUrl && (
                        <img
                          src={med.imageUrl}
                          alt={med.title}
                          className="w-full object-contain max-h-[450px] bg-black/40"
                        />
                      )}
                      <div className="p-4 bg-ink-950/80 border-t border-white/[0.06]">
                        <div className="font-display font-semibold text-paper text-sm">{med.title}</div>
                        <p className="text-xs text-muted font-mono mt-1">{med.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-muted mb-2">
                Arquitetura e Escopo
              </h4>
              <p className="text-paper/80 text-sm sm:text-base leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-muted mb-3">
                Destaques da Implementação
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-ink-950/60 border border-white/[0.04] text-xs text-paper/80">
                    <CheckCircle2 className="w-4 h-4 text-signal shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-muted mb-3">
                Stack Tecnológica Utilizada
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-white/[0.05] border border-white/10 font-mono text-xs text-paper/90">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
