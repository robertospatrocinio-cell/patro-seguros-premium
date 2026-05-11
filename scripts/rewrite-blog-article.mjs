import fs from 'fs';

// Read the original backup if possible or the current messy one
let content = fs.readFileSync('src/pages/BlogArticle.tsx', 'utf8');

// Define the clean structure
const cleanHeader = `import { useParams, Link } from "react-router-dom";
import { Fragment, lazy, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import WebSiteSchema from "@/components/WebSiteSchema";
import OrganizationSchema from "@/components/OrganizationSchema";
import ArticleSchema from "@/components/ArticleSchema";
import { getCanonicalUrl, CANONICAL_BASE_URL } from "@/lib/canonical";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, ArrowLeft, ArrowRight, Calendar, Clock, User, Check, X, Scale, TrendingDown } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
import { getArticleImage } from "@/lib/blogImages";
import OptimizedImage from "@/components/OptimizedImage";
import { getArticleMeta, getRelatedArticles, formatDate } from "@/lib/blogData";
import EbookConsorcioBanner from "@/components/EbookConsorcioBanner";
import { articlesContent } from "@/data/blogArticlesContent";
import { extraFaqsBySlug } from "@/data/blogExtraData";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20blog%20da%20Patro%20Seguros%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.";
const BlogFormCTA = lazy(() => import("@/components/BlogFormCTA"));
const StickyQuoteBar = lazy(() => import("@/components/StickyQuoteBar"));

const defaultArticle = {
  title: "Artigo não encontrado",
  content: "O conteúdo solicitado não está disponível no momento.",
  faqs: []
};
`;

// Extract the BlogArticle component body
const componentStart = content.indexOf("const BlogArticle = () => {");
const componentBody = content.substring(componentStart);

fs.writeFileSync('src/pages/BlogArticle.tsx', cleanHeader + "\n" + componentBody);
console.log('✅ BlogArticle.tsx fixed and cleaned.');
