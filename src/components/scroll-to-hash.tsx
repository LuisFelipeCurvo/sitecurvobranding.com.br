"use client";

import { useEffect } from "react";

/**
 * Corrige o scroll-to-anchor no carregamento direto de uma URL com hash
 * (ex.: alguém abre `curvobranding.com.br/#o-que-fazemos` direto). O pulo
 * nativo do navegador acontece antes das seções pinadas (ClientSurfer,
 * Workflow) terminarem de calcular a altura, então erra o alvo. Só entra
 * em ação uma vez, no mount; clique de nav com a página já carregada não
 * passa por aqui (já funciona certo via `<a href="#id">` nativo).
 */
export function ScrollToHash() {
  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView();
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
