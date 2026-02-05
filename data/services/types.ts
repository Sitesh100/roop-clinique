export interface Feature {
  img: string;
  title: string;
}

export interface ProcedureInfo {
  coloredTitle: string;
  title: string;
  bulletPoints: string[];
}

export interface SecondSection {
  heading: string;
  coloredHeading?: string;
  description: string;
  features?: string[];
}

export interface ProcedureStep {
  title: string;
  description: string[];
}

export interface Procedure {
  steps: ProcedureStep[];
}

export interface Faq {
  question: string;
  answer: string;
}

export interface PageData {
  title: string;
  subtitle: string;
  features: Feature[];
  procedureInfo: ProcedureInfo;
  secondSection?: SecondSection;
  procedure?: Procedure;
  faqs: Faq[];
  beforeAfterImage?: string;
  secondImage?: string;
}