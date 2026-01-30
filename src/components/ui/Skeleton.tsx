import React from 'react';

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '20px',
  className = '',
  variant = 'rectangular',
  animation = 'pulse',
}) => {
  const baseClasses = 'bg-gray-200';

  const variantClasses = {
    rectangular: 'rounded',
    circular: 'rounded-full',
    text: 'rounded',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={{ width, height }}
    />
  );
};

// Specialized skeleton components for common patterns
export const ProductCardSkeleton: React.FC = () => (
  <div className="w-full">
    <Skeleton height="340px" className="mb-4" />
    <Skeleton height="24px" width="80%" className="mb-2" />
    <Skeleton height="20px" width="40%" className="mb-2" />
    <Skeleton height="32px" width="60%" />
  </div>
);

export const BlogCardSkeleton: React.FC = () => (
  <div className="w-full">
    <Skeleton height="469px" className="mb-4" />
    <Skeleton height="24px" width="90%" className="mb-2" />
    <Skeleton height="16px" width="70%" className="mb-2" />
    <Skeleton height="16px" width="60%" />
  </div>
);

export const CategoryCardSkeleton: React.FC = () => (
  <div className="w-full">
    <Skeleton height="183px" className="mb-2" />
    <Skeleton height="20px" width="60%" />
  </div>
);

export const InstagramReelSkeleton: React.FC = () => (
  <Skeleton height="208px" width="208px" />
);

export const FeatureCardSkeleton: React.FC = () => (
  <div className="w-full text-center">
    <Skeleton height="60px" width="60px" className="mx-auto mb-3" variant="circular" />
    <Skeleton height="20px" width="80%" className="mx-auto mb-2" />
    <Skeleton height="16px" width="60%" className="mx-auto" />
  </div>
);

export const BentoImageSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <Skeleton height="100%" className={className} />
);

export const NavigationSkeleton: React.FC = () => (
  <div className="flex gap-4">
    {[...Array(4)].map((_, i) => (
      <Skeleton key={i} height="20px" width="100px" />
    ))}
  </div>
);

export default Skeleton;
