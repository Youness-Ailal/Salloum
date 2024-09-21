function useShareSocial() {
  const shareUrl = window.location.href;

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`);
  };
  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${shareUrl}`);
  };

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/shareArticle?url=${shareUrl}`);
  };

  const shareToGoogle = () => {
    window.open(`https://plus.google.com/share?url=${shareUrl}`);
  };
  const shareToWhatsapp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareUrl)}`);
  };
  return {
    shareToFacebook,
    shareToTwitter,
    shareToLinkedIn,
    shareToGoogle,
    shareToWhatsapp,
  };
}

export default useShareSocial;
