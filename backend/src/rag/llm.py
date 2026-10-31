"""
llm.py — LLM provider (Ollama only).

Returns ChatOllama for local inference via Ollama.
"""

import logging
from functools import lru_cache

from langchain_ollama import ChatOllama
from langchain.chat_models import init_chat_model
from langchain_core.language_models.chat_models import BaseChatModel

from src.config.settings import get_settings

logger = logging.getLogger(__name__)


@lru_cache(maxsize=4)
def _get_ollama_llm(
    model: str,
    temperature: float,
    max_tokens: int,
    model_provider:str,
    api_key:str = ""
) -> ChatOllama:
    """Cached Ollama LLM instance."""
    return init_chat_model(
        model=model,
        model_provider=model_provider,
        temperature=temperature,
        max_tokens=max_tokens,
        api_key=api_key
        
    )


def get_llm_model(
    temperature: float = 0.1,
    max_tokens: int = 5096,
) -> BaseChatModel:
    """
    Return the Ollama LLM for local inference.
    """
    settings = get_settings()
    logger.info(f"[LLM] Using Ollama model: {settings.LLM_MODEL}")
    print(settings.LLM_MODEL, settings.LLM_MODEL_PROVIDER, end="\n")
    return _get_ollama_llm(
        model=settings.LLM_MODEL,
        temperature=temperature,
        max_tokens=max_tokens,
        model_provider=settings.LLM_MODEL_PROVIDER,
        api_key=settings.OPEN_ROUTER_API
    )
