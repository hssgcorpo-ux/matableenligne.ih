export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-brand-cream px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-serif text-3xl font-bold">Mentions légales</h1>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-brand-dark/80">
          <section>
            <h2 className="font-serif text-lg font-semibold text-brand-dark">
              Éditeur du site
            </h2>
            <p className="mt-2">
              Le site TableEnLigne est édité par [NOM / RAISON SOCIALE À
              COMPLÉTER], micro-entreprise immatriculée sous le numéro SIRET
              [À COMPLÉTER], dont le siège est situé [ADRESSE À COMPLÉTER].
              <br />
              Email : [EMAIL DE CONTACT À COMPLÉTER]
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-semibold text-brand-dark">
              Directeur de la publication
            </h2>
            <p className="mt-2">[NOM DU RESPONSABLE À COMPLÉTER].</p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-semibold text-brand-dark">
              Hébergement
            </h2>
            <p className="mt-2">
              Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133,
              Covina, CA 91723, États-Unis — vercel.com.
              <br />
              La base de données est hébergée par Supabase Inc.
              (supabase.com).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-semibold text-brand-dark">
              Propriété intellectuelle
            </h2>
            <p className="mt-2">
              L&apos;ensemble des éléments du site TableEnLigne (textes,
              logos, mise en page) est la propriété de l&apos;éditeur, sauf
              mention contraire. Toute reproduction sans autorisation est
              interdite.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-semibold text-brand-dark">
              Données personnelles
            </h2>
            <p className="mt-2">
              Les données collectées (email, informations du restaurant)
              sont utilisées uniquement pour le fonctionnement du service.
              Conformément au RGPD, vous pouvez demander l&apos;accès, la
              rectification ou la suppression de vos données en nous
              contactant à [EMAIL À COMPLÉTER].
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-semibold text-brand-dark">
              Cookies
            </h2>
            <p className="mt-2">
              Le site utilise uniquement des cookies strictement nécessaires
              à l&apos;authentification (session utilisateur), aucun cookie
              publicitaire ou de traçage tiers n&apos;est utilisé.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
