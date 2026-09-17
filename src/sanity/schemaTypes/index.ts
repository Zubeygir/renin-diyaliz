import { seoType } from "./objects/seo";
import { socialLinkType } from "./objects/socialLink";
import { customHtmlType } from "./objects/customHtml";
import { localizedStringType } from "./objects/localizedString";
import { localizedTextType } from "./objects/localizedText";
import { localizedSlugType } from "./objects/localizedSlug";
import { localizedPortableTextType } from "./objects/localizedPortableText";
import { siteSettingsType } from "./singletons/siteSettings";
import { navigationType } from "./singletons/navigation";
import { homePageType } from "./singletons/homePage";
import { aboutPageType } from "./singletons/aboutPage";
import { missionVisionPageType } from "./singletons/missionVisionPage";
import { orgChartPageType } from "./singletons/orgChartPage";
import { staffPageType } from "./singletons/staffPage";
import { galleryPageType } from "./singletons/galleryPage";
import { contactPageType } from "./singletons/contactPage";
import { kvkkPageType } from "./singletons/kvkkPage";
import { cookiePolicyPageType } from "./singletons/cookiePolicyPage";
import { blogPageType } from "./singletons/blogPage";
import { servicesPageType } from "./singletons/servicesPage";
import { projectsPageType } from "./singletons/projectsPage";
import { blogPostType } from "./documents/blogPost";
import { blogCategoryType } from "./documents/blogCategory";
import { serviceType } from "./documents/service";
import { projectType } from "./documents/project";
import { staffMemberType } from "./documents/staffMember";
import { partnerType } from "./documents/partner";

export const schemaTypes = [
  // Objects
  seoType,
  socialLinkType,
  customHtmlType,
  localizedStringType,
  localizedTextType,
  localizedSlugType,
  localizedPortableTextType,
  // Singletons
  siteSettingsType,
  navigationType,
  homePageType,
  aboutPageType,
  missionVisionPageType,
  orgChartPageType,
  staffPageType,
  galleryPageType,
  contactPageType,
  kvkkPageType,
  cookiePolicyPageType,
  blogPageType,
  servicesPageType,
  projectsPageType,
  // Collections
  blogPostType,
  blogCategoryType,
  serviceType,
  projectType,
  staffMemberType,
  partnerType,
];
