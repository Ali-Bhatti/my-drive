<template>
  <div class="logo-container" :style="{ width: size + 'px', height: size + 'px' }">
    <svg :width="size" :height="size" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Main cube shape -->
      <path 
        d="M85 35L50 55L15 35L50 15L85 35Z" 
        :fill="primaryColor"
        class="logo-shape top"
      />
      <!-- Left side -->
      <path 
        d="M15 35L50 55V85L15 65V35Z" 
        :fill="secondaryColor"
        class="logo-shape left"
      />
      <!-- Right side -->
      <path 
        d="M50 55L85 35V65L50 85V55Z" 
        :fill="accentColor"
        class="logo-shape right"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    size: {
      type: Number,
      default: 40
    },
    primaryColor: {
      type: String,
      default: '#01A775' // Main brand green
    },
    secondaryColor: {
      type: String,
      default: '#018A61' // Darker shade
    },
    accentColor: {
      type: String,
      default: '#00C488' // Lighter shade
    }
  }
};
</script>

<style scoped>
.logo-container {
  display: inline-block;
}

.logo-shape {
  transition: all 0.3s ease;
}

.logo-container:hover .top {
  transform: translateY(-2px);
}

.logo-container:hover .left {
  transform: translateX(-2px);
}

.logo-container:hover .right {
  transform: translateX(2px);
}
</style> 