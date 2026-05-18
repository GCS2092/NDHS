import { BackButton } from '@/components/back-button';
import { PageHeader } from '@/components/page-header';
import { PremiumCard } from '@/components/premium-card';
import { Users, Target, Eye, Award, TrendingUp, Globe } from 'lucide-react';
import { getAboutPage } from '@/sanity/client';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';

export default async function AboutPage() {
  const aboutPage = await getAboutPage();

  return (
    <div className="min-h-screen">
      <PageHeader
        title={aboutPage?.title || 'À propos'}
        description={aboutPage?.subtitle || 'Découvrez notre histoire et nos valeurs'}
        icon={<Users className="w-8 h-8" />}
      />
      
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <BackButton href="/" label="Retour à l'accueil" />
          
          {/* Stats Section */}
          {aboutPage?.stats && aboutPage.stats.length > 0 && (
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {aboutPage.stats.map((stat: any, index: number) => (
                <PremiumCard key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </PremiumCard>
              ))}
            </div>
          )}
          
          {/* Story Section */}
          <div className="mt-12">
            <PremiumCard className="p-8 md:p-12 hover:shadow-lg transition-all duration-300">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Notre histoire</h2>
              {aboutPage?.story && (
                <div className="prose prose-lg max-w-none text-foreground/80">
                  <PortableText value={aboutPage.story} />
                </div>
              )}
            </PremiumCard>
          </div>
          
          {/* Mission & Vision */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {aboutPage?.mission && (
              <PremiumCard className="p-8 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Notre mission</h3>
                <p className="text-foreground/70">{aboutPage.mission}</p>
              </PremiumCard>
            )}
            
            {aboutPage?.vision && (
              <PremiumCard className="p-8 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Notre vision</h3>
                <p className="text-foreground/70">{aboutPage.vision}</p>
              </PremiumCard>
            )}
          </div>
          
          {/* Values Section */}
          {aboutPage?.values && aboutPage.values.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Nos valeurs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {aboutPage.values.map((value: any, index: number) => (
                  <PremiumCard key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-bold mb-2">{value.title}</h3>
                    <p className="text-sm text-foreground/70">{value.description}</p>
                  </PremiumCard>
                ))}
              </div>
            </div>
          )}
          
          {/* Team Section */}
          {aboutPage?.team && aboutPage.team.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Notre équipe</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aboutPage.team.map((member: any, index: number) => (
                  <PremiumCard key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-center mb-1">{member.name}</h3>
                    <p className="text-sm text-muted-foreground text-center">{member.role}</p>
                  </PremiumCard>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
