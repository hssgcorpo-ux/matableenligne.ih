export default function CgvPage() {
  return (
    <main className="min-h-screen bg-brand-cream px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-serif text-3xl font-bold">
          Conditions générales de vente
        </h1>
        <p className="mt-2 text-sm text-brand-dark/50">
          Dernière mise à jour : [DATE À COMPLÉTER]
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-brand-dark/80">
          <section>
            <h2 className="font-serif text-lg font-semibold text-brand-dark">
              1. Objet
            </h2>
            <p className="mt-2">
              Les présentes conditions générales de vente (CGV) régissent
              l&apos;utilisation du service TableEnLigne, une solution
              permettant aux restaurateurs de créer et gérer une page web
              dédiée à leur établissement (menu, photos, coordonnées).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-semibold text-brand-dark">
              2. Tarifs
            </h2>
            <p className="mt-2">
              L&apos;abonnement est facturé 19€ TTC par mois, auquel
              s&apos;ajoutent 49€ TTC de frais de mise en service, facturés
              une seule fois à la souscription. Les prix peuvent évoluer
              avec un préavis d&apos;au moins 30 jours.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-semibold text-brand-dark">
              3. Durée et résiliation
            </h2>
            <p className="mt-2">
              L&apos;abonnement est sans engagement de durée et peut être
              résilié à tout moment depuis l&apos;espace client ou en nous
              contactant. La résiliation prend effet à la fin de la période
              déjà payée ; aucun remboursement au prorata n&apos;est
              effectué pour le mois en cours.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-semibold text-brand-dark">
              4. Paiement
            </h2>
            <p className="mt-2">
              Les paiements sont traités de façon sécurisée par notre
              prestataire Stripe. TableEnLigne n&apos;a jamais accès ni ne
              stocke les coordonnées bancaires du client.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-semibold text-brand-dark">
              5. Disponibilité du service
            </h2>
            <p className="mt-2">
              TableEnLigne met tout en œuvre pour assurer la disponibilité
              du service mais ne peut garantir une disponibilité absolue
              (maintenance, panne d&apos;un prestataire tiers). Aucune
              indemnisation n&apos;est due en cas d&apos;interruption
              ponctuelle.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-semibold text-brand-dark">
              6. Responsabilité du contenu
            </h2>
            <p className="mt-2">
              Le client est seul responsable du contenu qu&apos;il publie
              sur sa page (textes, photos, prix). TableEnLigne se réserve le
              droit de suspendre un compte publiant un contenu illicite.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-semibold text-brand-dark">
              7. Données personnelles
            </h2>
            <p className="mt-2">
              Voir nos mentions légales pour le détail du traitement des
              données personnelles, conformément au RGPD.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-semibold text-brand-dark">
              8. Contact
            </h2>
            <p className="mt-2">
              Pour toute question relative à ces CGV, contactez-nous à
              [EMAIL À COMPLÉTER].
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
