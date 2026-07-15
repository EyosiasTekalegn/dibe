import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  name?: string;
  type?: string;
  image?: string;
}

export function SEO({ 
  title = 'Dibe Engineering (DE) | Premium Metal Fabrication and Engineering Services',
  description = 'Dibe Engineering (DE) is Ethiopia’s premier provider of custom steelworks, metal fabrication, industrial automation, electromechanical works, and architectural aluminum. Leading solutions by DE.',
  name = 'Dibe Engineering (DE)',
  type = 'website',
  image = '/logo_de.png'
}: SEOProps) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content='DE, DE Engineering, Dibe Engineering, Dibe Engineering (DE), DE Steelworks, DE Automation, DE metalworks, metal, engineering, fabrication, steel fabrication Ethiopia, electromechanics Addis Ababa, curtain walls, architectural aluminum, custom machining DE, steel construction, Ethiopian industrial engineering, mechanical engineering, custom fabrication' />
      <meta name='author' content='Dibe Engineering (DE)' />
      <meta name='robots' content='index, follow' />
      
      {/* OpenGraph tags */}
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content={type} />
      <meta property='og:site_name' content={name} />
      <meta property='og:image' content={image} />
      
      {/* Twitter tags */}
      <meta name='twitter:creator' content={name} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />
    </Helmet>
  );
}
