// course-catalog.js — espelha a estrutura de módulos/aulas do frontend (6 níveis,
// 24 aulas) para o backend poder validar avanço sequencial e aplicar avaliações.
// Isto é a fonte de verdade para: quais aulas existem em cada módulo, e a ordem
// oficial dos módulos (Explorer → Master).

const MODULES = [
  { id: 'm1', level: 'explorer', levelLabel: 'IA Explorer', accessKey: 'EXPLORER-KEY', ageRange: '7-10 anos', lessonCount: 4 },
  { id: 'm2', level: 'builder', levelLabel: 'IA Builder', accessKey: 'BUILDER-KEY', ageRange: '11-14 anos', lessonCount: 4 },
  { id: 'm3', level: 'creator', levelLabel: 'IA Creator', accessKey: 'CREATOR-KEY', ageRange: '15-16 anos', lessonCount: 4 },
  { id: 'm4', level: 'professional', levelLabel: 'IA Professional', accessKey: 'PROFESSIONAL-KEY', ageRange: '17+ anos', lessonCount: 4 },
  { id: 'm5', level: 'specialist', levelLabel: 'IA Specialist', accessKey: 'SPECIALIST-KEY', ageRange: 'Especialização', lessonCount: 4 },
  { id: 'm6', level: 'master', levelLabel: 'IA Master & Trainer', accessKey: 'MASTER-KEY', ageRange: 'Formação de formadores', lessonCount: 4 },
];

function moduleIndex(moduleId) {
  return MODULES.findIndex((m) => m.id === moduleId);
}

function lessonKeys(moduleId) {
  const m = MODULES.find((mm) => mm.id === moduleId);
  if (!m) return [];
  return Array.from({ length: m.lessonCount }, (_, i) => `${moduleId}-l${i + 1}`);
}

function allLessonKeysUpTo(moduleId) {
  const idx = moduleIndex(moduleId);
  if (idx === -1) return [];
  return MODULES.slice(0, idx + 1).flatMap((m) => lessonKeys(m.id));
}

function nextModuleId(moduleId) {
  const idx = moduleIndex(moduleId);
  if (idx === -1 || idx === MODULES.length - 1) return null;
  return MODULES[idx + 1].id;
}

module.exports = { MODULES, moduleIndex, lessonKeys, allLessonKeysUpTo, nextModuleId };
